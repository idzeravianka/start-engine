import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";

export type ConnectionFormDT = Omit<MqttSettings, 'dashboardItemsSettings'>
export type NewConnectionFormDT = Omit<ConnectionFormDT, 'id' | 'carIconKey'>;