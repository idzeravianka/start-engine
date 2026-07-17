'use client';
import {useState, useCallback, useEffect} from 'react';
import {disconnectMqtt, getMqttClient} from "@/src/utils/mqtt-client";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {MqttClient} from "mqtt";

export const useMqtt = (onMessageCallback?: (sensorsData: MqttSensorsDataResponse) => void) => {
    const [client, setClient] = useState<MqttClient | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!client) return;

        const onConnect = () => setIsConnected(true);
        const onOffline = () => setIsConnected(false);
        const onMessage = (_, message: Buffer) => {
            if (onMessageCallback) onMessageCallback(JSON.parse(message.toString()) as MqttSensorsDataResponse)
        };

        client.on('connect', onConnect);
        client.on('offline', onOffline);
        client.on('message', onMessage);

        setIsConnected(() => client.connected);
        return () => {
            client.off('connect', onConnect);
            client.off('offline', onOffline);
            client.off('message', onMessage);
        };
    }, [client, onMessageCallback]);

    const subscribe = useCallback((topic: string) => {
        if (client?.connected) {
            client.subscribe(topic, {qos: 0});
        }
    }, [client]);

    const reconnect = useCallback((activeCar: MqttSettings) => {
        disconnectMqtt();
        const newClient = getMqttClient(activeCar);
        setClient(() => newClient);
    }, []);

    return {client, reconnect, isConnected, subscribe};
};