'use client';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {useSettingsStore} from "@/src/utils/user-settings-store";

const MQTT_DEFAULT_OPTIONS: IClientOptions = {
    encoding: 'utf8',
    protocol: 'wss',
    clean: true,
    connectTimeout: 5000,
    reconnectPeriod: 2000,
    keepalive: 30,

};

let client: MqttClient | null = null;

export const getMqttClient = (activeCar: MqttSettings): MqttClient => {
    if (client && client.options.clientId !== `${activeCar.id}_${activeCar.name}`) {
        disconnectMqtt();
    }
    if (!client) {
        client = mqtt.connect(`wss://${activeCar.server}`, {
            ...MQTT_DEFAULT_OPTIONS,
            username: activeCar.user,
            password: activeCar.pass,
            port: +activeCar.port,
            clientId: `${activeCar.id}_${activeCar.name}`,
        });
    }
    client.on('connect', () => {
        useSettingsStore.getState().setMqttStatus('connected');
    });

    client.on('offline', () => {
        useSettingsStore.getState().setMqttStatus('disconnected');
    });

    client.on('reconnect', () => {
        useSettingsStore.getState().setMqttStatus('connecting');
    });
    return client;
};

export const sendCommand = (topic: string, message: string) => {
    if (client?.connected) {
        client.publish(topic, message, { qos: 1 });
    }
};

export const disconnectMqtt = () => {
    if (client) {
        client.end();
        client = null;
    }
};
