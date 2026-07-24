import {IActionButton} from "@/src/types/interfaces/action-button";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {sendCommand} from "@/src/utils/mqtt-client";
import React from "react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import BoltIcon from '@mui/icons-material/Bolt';
import WifiIcon from '@mui/icons-material/Wifi';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {ControlStatuses} from "@/src/types/enums/control-statuses";

export const defaultQuickActionButtonsSettings: IActionButton[] = [
    {
        label: "Сценарий 6",
        isVisible: true,
        icon: <ListAltIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.Scenario6,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Сценарий 7",
        isVisible: true,
        icon: <ListAltIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.Scenario7,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Сценарий 8",
        isVisible: true,
        icon: <ListAltIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.Scenario8,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Сценарий 9",
        isVisible: true,
        icon: <ListAltIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.Scenario9,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Контроль IN2",
        isVisible: true,
        status: (sensorData) => sensorData.control[ControlStatuses.IN2Control] ? 'ON' : 'OFF',
        command: (sensorData) => sensorData.control[ControlStatuses.IN2Control] ? MqttCommands.IN2ControlOff : MqttCommands.IN2ControlOn,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Термостат ВКЛ",
        isVisible: true,
        status: (sensorData) => sensorData.control[ControlStatuses.TemperatureControl] ? 'ON' : 'OFF',
        command: (sensorData) => sensorData.control[ControlStatuses.TemperatureControl] ? MqttCommands.ThermostatOff : MqttCommands.ThermostatOn,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Стартер 2.5 сек",
        isVisible: true,
        icon: <BoltIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.StarterCrankTime2And5Sec,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "WI-FI ВКЛ",
        isVisible: true,
        icon: <WifiIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.WiFiOn,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        label: "Перезагрузка",
        isVisible: true,
        icon: <RestartAltIcon sx={{fontSize: '20px'}} />,
        command: () => MqttCommands.Reboot,
        onAction: (topic, command) => sendCommand(topic, command),
    },
]
