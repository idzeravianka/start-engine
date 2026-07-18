'use client';
import {useState, useCallback, useEffect} from 'react';
import {disconnectMqtt, getMqttClient} from "@/src/utils/mqtt-client";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {MqttClient} from "mqtt";

// export const useMqtt = (onMessageCallback: (sensorsData: MqttSensorsDataResponse) => void) => {
//     const [client, setClient] = useState<MqttClient | null>(null);
//
//     useEffect(() => {
//         if (!client) return;
//
//         const onMessage = (_: string, message: Buffer) => {
//             onMessageCallback(JSON.parse(message.toString()) as MqttSensorsDataResponse);
//         };
//
//         client.on('message', onMessage);
//
//         return () => {
//             client.off('message', onMessage);
//         };
//     }, [client, onMessageCallback]);
//
//     const subscribe = useCallback((topic: string) => {
//         if (client?.connected) {
//             client.subscribe(topic, {qos: 0});
//         }
//     }, [client]);
//
//     const reconnect = useCallback((activeCar: MqttSettings) => {
//         disconnectMqtt();
//         const newClient = getMqttClient(activeCar);
//         setClient(() => newClient);
//     }, []);
//
//     return {client, reconnect, subscribe};
// };