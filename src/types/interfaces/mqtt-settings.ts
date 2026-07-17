import { DashboardItemNames } from '../enums/dashboard-item-names';

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
  [DashboardItemNames.CentralLock]: ItemSettings;
  [DashboardItemNames.WebastoButtons]: ItemSettings;
}

export interface ItemSettings {
  name: string;
  isVisible: boolean;
}
