import {MqttCommands} from "@/src/types/enums/mqtt-commands";

export interface IActionButton {
    label?: string;
    isVisible: boolean;
    icon: React.ReactNode;
    command: MqttCommands;
    onAction: (topic: string, command: MqttCommands) => void;
}