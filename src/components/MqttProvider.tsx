'use client';
import { useEffect } from 'react';
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {disconnectMqtt, getMqttClient} from "@/src/utils/mqtt-client";

export function MqttProvider({ children }: { children: React.ReactNode }) {
    const activeCar = useSettingsStore(state => state.getActiveCar());
    const setMqttData = useSettingsStore((state) => state.setMqttData);

    useEffect(() => {
        if (activeCar) {
            getMqttClient(activeCar, setMqttData);
        } else {
            disconnectMqtt();
        }

        return () => disconnectMqtt();
    }, [activeCar]);

    return <>{children}</>;
}
