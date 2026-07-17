'use client';
import {MqttSettings, UserSettings} from "@/src/types/interfaces/mqtt-settings";
import {generateId} from "@/src/utils/generate-id";
import localforage from "localforage";

const SETTINGS_KEY = 'autorun_mqtt_settings';
const CAR_ICON_STORAGE_KEY = 'autorun_car_icon_storage';
localforage.config({
    name: 'CarAppDB',
    storeName: 'app_settings',
    description: 'Хранилище настроек PWA приложения автозапуска'
});

export function getAllSettings(): UserSettings | null {
    if (typeof window === 'undefined') return null;

    const supported = localStorage.getItem(SETTINGS_KEY);

    if (supported) {
        return JSON.parse(supported) as UserSettings;
    }

    const deprecated = localStorage.getItem('mqtt_seting');
    if (deprecated) {
        updateDeprecatedSettings(deprecated);
        const updated = localStorage.getItem(SETTINGS_KEY);
        return updated ? (JSON.parse(updated) as UserSettings) : null;
    }

    return null;
}

export function getActiveCar(): MqttSettings | null {
    const all = getAllSettings();
    if (!all || !all.selectedEntityId) return null;
    return all.savedEntities.find(e => e.id === all.selectedEntityId) ?? null;
}

export function setSettings(settings: UserSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function updateDeprecatedSettings(deprecatedSettings: string): void {
    const entityId = generateId();
    const settings = JSON.parse(deprecatedSettings) as MqttSettings;

    setSettings({
        selectedEntityId: entityId,
        savedEntities: [{...settings, id: entityId, name: 'Car #1'}],
    });
    localStorage.removeItem('mqtt_seting');
}

export function removeCarById(carId: string): MqttSettings[] {
    const settings = getAllSettings();
    if (!settings) return [];

    settings.savedEntities = settings.savedEntities?.filter((entity) => entity.id !== carId);
    if (settings.selectedEntityId === carId) {
        settings.selectedEntityId = settings.savedEntities?.[0]?.id ?? null;
    }

    setSettings(settings);
    return getAllSettings()?.savedEntities ?? [];
}

export async function uploadCarIcon(file: File, carId: string): Promise<void> {
    try {
        await localforage.setItem(`${CAR_ICON_STORAGE_KEY}_${carId}`, file);
    } catch (err) {
        console.error('Ошибка localForage при сохранении:', err);
    }
};

export async function loadSavedImage(carId: string): Promise<string | undefined> {
    try {
        const blob = await localforage.getItem<Blob>(`${CAR_ICON_STORAGE_KEY}_${carId}`);

        if (blob) {
            return URL.createObjectURL(blob);
        }
    } catch (err) {
        console.error('Ошибка localForage при чтении:', err);
    }
}
