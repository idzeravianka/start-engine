'use client';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";

const MQTT_DEFAULT_OPTIONS: IClientOptions = {
    encoding: 'utf8',
    protocol: 'wss',
    clean: true,
    connectTimeout: 5000,
    reconnectPeriod: 2000,
    keepalive: 30,

};

let client: MqttClient | null = null;

export const getMqttClient = (activeCar: MqttSettings, onMessageCallback: (sensorsData: MqttSensorsDataResponse) => void): MqttClient => {
    if (client && client.options.clientId !== `${activeCar.id}_${activeCar.name}`) {
        disconnectMqtt();
        return getMqttClient(activeCar, onMessageCallback);
    }
    if (!client) {
        client = mqtt.connect(`wss://${activeCar.server}1234567`, {
            ...MQTT_DEFAULT_OPTIONS,
            // username: activeCar.user,
            // password: activeCar.pass,
            // port: +activeCar.port,
            // clientId: `${activeCar.id}_${activeCar.name}`,
        });

        client.on('connect', () => {
            useSettingsStore.getState().setMqttStatus('connected');
            client!.subscribe(`${activeCar.topic}/pub`, {qos: 0});
            sendCommand(`${activeCar.topic}`, MqttCommands.Update);
        });

        client.on('offline', () => {
            useSettingsStore.getState().setMqttStatus('disconnected');
        });

        client.on('reconnect', () => {
            useSettingsStore.getState().setMqttStatus('connecting');
        });
        client.on('message', (_: string, message: Buffer) => {
            console.log(JSON.parse(message.toString()) as MqttSensorsDataResponse);
            onMessageCallback(JSON.parse(message.toString()) as MqttSensorsDataResponse);
        });
    }

    return client;
};

export const sendCommand = (topic: string, message: MqttCommands) => {
    if (client?.connected) {
        client.publish(`${topic}/sub`, message, { qos: 1 });
    }
};

export const disconnectMqtt = () => {
    if (client) {
        client.end();
        client = null;
    }
};
