import {DashboardItemsSettings} from "@/src/types/interfaces/mqtt-settings";
import {DashboardItemNames} from "@/src/types/enums/dashboard-item-names";
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80";
import React from "react";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import KeyIcon from "@mui/icons-material/Key";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import PunchClockIcon from '@mui/icons-material/PunchClock';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {TemperatureStatuses} from "@/src/types/enums/temperature-statuses";
import {PinStatuses} from "@/src/types/enums/pin-statuses";
import {TimeStatuses} from "@/src/types/enums/time-statuses";

export const defaultSensorsSettings: DashboardItemsSettings = {
    [DashboardItemNames.Voltage]: {
        label: 'Заряд АКБ',
        isVisible: true,
        icon: <BatteryCharging80Icon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => `${sensorsData?.temp?.[TemperatureStatuses.Temp1] || '--'} °C`,
    },
    [DashboardItemNames.Timer]: {
        label: 'Таймер',
        isVisible: true,
        icon: <AvTimerIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => '--.--',
    },
    [DashboardItemNames.Count]: {
        label: 'Счетчик',
        isVisible: true,
        icon: <PunchClockIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.time?.[TimeStatuses.Count] || '--.--',
    },
    [DashboardItemNames.Temp1]: {
        label: 'Датчик №1',
        isVisible: true,
        icon: <ThermostatIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => `${sensorsData?.temp?.[TemperatureStatuses.Temp1] || '--'} °C`,
    },
    [DashboardItemNames.Temp2]: {
        label: 'Датчик №2',
        isVisible: true,
        icon: <ThermostatIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => `${sensorsData?.temp?.[TemperatureStatuses.Temp2] || '--'} °C`,
    },
    [DashboardItemNames.Temp3]: {
        label: 'Датчик №3',
        isVisible: true,
        icon: <ThermostatIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => `${sensorsData?.temp?.[TemperatureStatuses.Temp3] || '--'} °C`,
    },
    [DashboardItemNames.IN1]: {
        label: 'Канал IN1',
        isVisible: true,
        icon: <SettingsInputComponentIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.pin?.[PinStatuses.IN1] === 1 ? 'ON' : 'OFF',
    },
    [DashboardItemNames.IN2]: {
        label: 'Канал IN2',
        isVisible: true,
        icon: <SettingsInputComponentIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.pin?.[PinStatuses.IN2] === 1 ? 'ON' : 'OFF',
    },
    [DashboardItemNames.K2]: {
        label: 'Зажигание',
        isVisible: true,
        icon: <KeyIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.pin?.[PinStatuses.K2] === 1 ? 'ON' : 'OFF',
    },
    [DashboardItemNames.K1]: {
        label: 'Реле K1',
        isVisible: true,
        icon: <CompareArrowsIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.pin?.[PinStatuses.K1] === 1 ? 'ON' : 'OFF',
    },
    [DashboardItemNames.K4]: {
        label: 'Реле K4',
        isVisible: true,
        icon: <CompareArrowsIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.pin?.[PinStatuses.K4] === 1 ? 'ON' : 'OFF',
    },
    [DashboardItemNames.K5]: {
        label: 'Реле K5',
        isVisible: true,
        icon: <CompareArrowsIcon sx={{fontSize: '16px'}}/>,
        getValue: sensorsData => sensorsData?.pin?.[PinStatuses.K5] === 1 ? 'ON' : 'OFF',
    },
};
