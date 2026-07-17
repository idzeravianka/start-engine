export interface MqttSensorsDataResponse {
  pin?: number[];
  temp?: number[];
  time?: number[];
  control?: number[];
}

export const initialMqttSensorsData: MqttSensorsDataResponse = {
  pin: [],
  temp: [],
  time: [],
  control: [],
};
