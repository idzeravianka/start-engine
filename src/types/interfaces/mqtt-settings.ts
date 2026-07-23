import { DashboardItemNames } from '../enums/dashboard-item-names';
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";

export interface UserSettings {
  savedEntities: MqttSettings[];
  selectedEntityId: string | null;
}

export interface MqttSettings {
  id: string;
  name?: string;
  server: string;
  port: string;
  user: string;
  pass: string;
  topic: string;
  carIconKey?: string;
  dashboardItemsSettings?: DashboardItemsSettings;
}

export interface DashboardItemsSettings {
  [DashboardItemNames.Voltage]: ItemSettings;
  [DashboardItemNames.K1]: ItemSettings;
  [DashboardItemNames.K2]: ItemSettings;
  [DashboardItemNames.K4]: ItemSettings;
  [DashboardItemNames.K5]: ItemSettings;
  [DashboardItemNames.IN1]: ItemSettings;
  [DashboardItemNames.IN2]: ItemSettings;
  [DashboardItemNames.Temp1]: ItemSettings;
  [DashboardItemNames.Temp2]: ItemSettings;
  [DashboardItemNames.Temp3]: ItemSettings;
  [DashboardItemNames.Timer]: ItemSettings;
  [DashboardItemNames.Count]: ItemSettings;
}

export interface ItemSettings {
  label: string;
  isVisible: boolean;
  icon: React.ReactNode;
  getValue: (sensorsData: MqttSensorsDataResponse | null) => string | number;
}
