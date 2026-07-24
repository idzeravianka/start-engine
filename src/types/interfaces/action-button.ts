import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";

export interface IActionButton {
    label?: string;
    isVisible: boolean;
    icon: React.ReactNode;
    command: (sensorData: MqttSensorsDataResponse) => MqttCommands;
    status?: (sensorData: MqttSensorsDataResponse) => string;
    onAction: (topic: string, command: MqttCommands) => void;
}