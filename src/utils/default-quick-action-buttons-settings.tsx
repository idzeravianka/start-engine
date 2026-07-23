import {IActionButton} from "@/src/types/interfaces/action-button";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {sendCommand} from "@/src/utils/mqtt-client";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FanOnIcon from "@/src/components/FanOnIcon";
import ModeFanOffOutlinedIcon from "@mui/icons-material/ModeFanOffOutlined";

export const defaultQuickActionButtonsSettings: IActionButton[] = [
    {
        isVisible: true,
        icon: <LockOpenIcon />,
        command: MqttCommands.OpenLock,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        isVisible: true,
        icon: <LockOutlinedIcon />,
        command: MqttCommands.CloseLock,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        isVisible: true,
        icon: <FanOnIcon />,
        command: MqttCommands.FanOn,
        onAction: (topic, command) => sendCommand(topic, command),
    },
    {
        isVisible: true,
        icon: <ModeFanOffOutlinedIcon />,
        command: MqttCommands.FanOff,
        onAction: (topic, command) => sendCommand(topic, command),
    }
]