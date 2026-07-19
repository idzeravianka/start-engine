'use client';
import {MqttSettings, UserSettings} from "@/src/types/interfaces/mqtt-settings";
import localforage from "localforage";
import {createJSONStorage, persist} from "zustand/middleware";
import {create} from 'zustand';
import {
    MqttSensorsDataResponse
} from "@/src/types/interfaces/mqtt-sensors-data-response";
import {INITIAL_USER_SETTINGS} from "@/src/const/initial-user-settings";
import {INITIAL_MQTT_SENSORS_DATA} from "@/src/const/initial-mqtt-sensors-data";

const SETTINGS_KEY = 'autorun_mqtt_settings';
const CAR_ICON_STORAGE_KEY = 'autorun_car_icon_storage';
localforage.config({
    name: 'CarAppDB',
    storeName: 'app_settings',
    description: 'Хранилище настроек PWA приложения автозапуска'
});

interface SettingsState {
    settings: UserSettings;
    hasHydrated: boolean;
    mqttData: MqttSensorsDataResponse;
    mqttDataUpdateTime: string | null;
    mqttStatus: 'connected' | 'disconnected' | 'connecting';
    setSettings: (settings: UserSettings) => void;
    removeCarById: (carId: string) => void;
    addOrUpdateConnection: (settings: MqttSettings) => void;
    getActiveCar: () => MqttSettings | null;
    setActiveCarId: (carId: string) => void;
    setHasHydrated: (state: boolean) => void;
    setMqttData: (data: MqttSensorsDataResponse) => void;
    setMqttStatus: (status: 'connected' | 'disconnected' | 'connecting') => void;
}

// function updateDeprecatedSettings(deprecatedSettings: string): void {
//     const entityId = generateId();
//     const settings = JSON.parse(deprecatedSettings) as MqttSettings;
//
//     setSettings({
//         selectedEntityId: entityId,
//         savedEntities: [{...settings, id: entityId, name: 'Car #1'}],
//     });
//     localStorage.removeItem('mqtt_seting');
// }

export const carIconService = {
    async upload(carId: string, file: File) {
        await localforage.setItem(`${CAR_ICON_STORAGE_KEY}${carId}`, file);
    },

    async load(carId: string): Promise<string | null> {
        const blob = await localforage.getItem<Blob>(`${CAR_ICON_STORAGE_KEY}${carId}`);
        return blob ? URL.createObjectURL(blob) : null;
    },

    async remove(carId: string) {
        await localforage.removeItem(`${CAR_ICON_STORAGE_KEY}${carId}`);
    }
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            settings: INITIAL_USER_SETTINGS,
            hasHydrated: false,
            mqttData: INITIAL_MQTT_SENSORS_DATA,
            mqttDataUpdateTime: null,
            mqttStatus: 'disconnected',
            setSettings: (settings: UserSettings) => set({settings}),
            removeCarById: async (carId: string) => {
                await carIconService.remove(carId);

                set((state: SettingsState) => {
                    if (!state.settings) return state;

                    const updatedEntities: MqttSettings[] = state.settings.savedEntities.filter(({id}) => id !== carId);

                    const newSelectedId: string | null = state.settings.selectedEntityId === carId
                        ? (updatedEntities[0]?.id ?? null)
                        : state.settings.selectedEntityId;

                    return {
                        settings: {
                            ...state.settings,
                            savedEntities: updatedEntities,
                            selectedEntityId: newSelectedId,
                        },
                    };
                })
            },
            addOrUpdateConnection: (settings: MqttSettings) => set((state) => {
                const exists = state.settings.savedEntities.find(e => e.id === settings.id);

                return exists
                    ? {
                        settings: {
                            ...state.settings,
                            savedEntities: state.settings.savedEntities.map(e => e.id === settings.id ? settings : e),
                            selectedEntityId: settings.id,
                        }
                    }
                    : {settings: {...state.settings, savedEntities: [...state.settings.savedEntities, settings], selectedEntityId: settings.id}};
            }),
            getActiveCar: () => {
                const {settings} = get();
                if (!settings || !settings.selectedEntityId) return null;
                return settings.savedEntities.find((e: MqttSettings) => e.id === settings.selectedEntityId) ?? null;
            },
            setActiveCarId: (carId) => {
                set((state) => {
                    if (!state.settings) return state;

                    return {
                        settings: {
                            ...state.settings,
                            selectedEntityId: carId
                        }
                    };
                });
            },
            setHasHydrated: (state) => set({hasHydrated: state}),
            setMqttData: (data) => set({mqttData: data, mqttDataUpdateTime: new Date().toTimeString().slice(0, 8)}),
            setMqttStatus: (status) => set({mqttStatus: status}),
        }),
        {
            name: SETTINGS_KEY,
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({settings: state.settings}),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);