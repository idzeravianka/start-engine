'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Box, Typography, Stack, CircularProgress} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import StopIcon from '@mui/icons-material/Stop';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import KeyIcon from '@mui/icons-material/Key';
import {useHaptic} from "@mxerf/tappt/react";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";
import {PinStatuses} from "@/src/types/enums/pin-statuses";
import {TemperatureStatuses} from "@/src/types/enums/temperature-statuses";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import SensorItem from "@/src/components/SensorItem";
import {SPIN_ANIMATION} from "@/src/const/common-sx-styles";
import {sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {TimeStatuses} from "@/src/types/enums/time-statuses";

export default function RemoteStart({car, sensorsData}: {
    car: MqttSettings | null,
    sensorsData: MqttSensorsDataResponse
}) {
    const [isHolding, setIsHolding] = useState(false);
    const [isStartStopExecuting, setIsStartStopExecuting] = useState<boolean>(false);
    const [timerData, setTimerData] = useState<number>(0);
    const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const haptic = useHaptic();

    useEffect(() => {
        const timer = sensorsData.time?.[TimeStatuses.Timer];
        if (timer !== undefined) {
            setTimerData(timer);
        }
    }, [sensorsData]);

    useEffect(() => {
        if (timerData <= 0) return;

        const timerId = setTimeout(() => {
            setTimerData((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timerData]);

    const engineCountdown = useMemo(() => {
        if (!timerData || timerData <= 0) return '--.--';
        return new Date(timerData * 1000).toISOString().substring(14, 19);
    }, [timerData]);

    useEffect(() => {
        setIsStartStopExecuting(() => false);
    }, [sensorsData]);

    const startPress = () => {
        if (!car || !sensorsData.pin.length || isStartStopExecuting) return;

        haptic.impact('medium');
        setIsHolding(true);
        holdTimeoutRef.current = setTimeout(() => {
            haptic.impact('light');
            setIsHolding(false);
            setIsStartStopExecuting(() => true);
            if (sensorsData.pin?.[PinStatuses.K2] === 0) {
                sendCommand(car.topic, MqttCommands.StartEngine)
            }
            if (sensorsData.pin?.[PinStatuses.K2] === 1) {
                sendCommand(car.topic, MqttCommands.StopEngine)
            }
        }, 1500);
    };

    const stopPress = () => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
        setIsHolding(false);
    };

    return (
        <Box sx={{py: 1, bgcolor: 'plat.bg', textAlign: 'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Stack spacing={1}>
                    <SensorItem icon={<KeyIcon sx={{fontSize: '16px'}}/>}
                                value={sensorsData.pin?.[PinStatuses.K2] === 1 ? 'ON' : 'OFF'}/>
                    <SensorItem icon={<ThermostatIcon sx={{fontSize: '16px'}}/>}
                                value={`${sensorsData.temp?.[TemperatureStatuses.Temp1] || '--'} °C`}/>
                </Stack>
                <Box sx={{position: 'relative'}}>
                    <Box
                        onTouchStart={startPress}
                        onTouchEnd={stopPress}
                        onMouseDown={startPress}
                        onMouseUp={stopPress}
                        onMouseLeave={stopPress}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            width: 138,
                            height: 138,
                            backgroundColor: 'plat.card',
                            borderRadius: 50,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            touchAction: 'none',
                            WebkitTapHighlightColor: 'transparent',
                        }}>
                        <CircularProgress
                            variant="determinate"
                            value={isHolding ? 100 : 0}
                            size={154}
                            thickness={2}
                            sx={{
                                color: sensorsData.pin?.[PinStatuses.K2] === 1 ? 'plat.brandCopper' : 'plat.brandCobalt',
                                position: 'absolute',
                                top: -8,
                                left: -8,
                                pointerEvents: 'none',
                                '& .MuiCircularProgress-circle': {
                                    transition: isHolding
                                        ? 'stroke-dashoffset 1500ms linear'
                                        : 'stroke-dashoffset 200ms linear',
                                }
                            }}
                        />

                        <StartStopIcon sensorsData={sensorsData} isStartStopExecuting={isStartStopExecuting}/>

                        <Typography variant="overline" sx={{
                            color: 'plat.textMuted',
                            fontWeight: 700,
                            display: 'block',
                            fontSize: '12px',
                            lineHeight: 1.5
                        }}>
                            {sensorsData.pin?.[PinStatuses.K2] === 1 ? 'Стоп' : 'Запуск'}
                        </Typography>
                    </Box>
                </Box>
                <Stack spacing={1}>
                    <SensorItem icon={<BatteryCharging80Icon sx={{fontSize: '16px'}}/>}
                                value={`${sensorsData?.pin?.[PinStatuses.Voltage] || '--'} V`}/>
                    <SensorItem icon={<AvTimerIcon sx={{fontSize: '16px'}}/>} value={engineCountdown}/>
                </Stack>
            </Box>

            <EngineStatus car={car} sensorsData={sensorsData}/>
        </Box>
    );
}

function EngineStatus({car, sensorsData}: { car: MqttSettings | null, sensorsData: MqttSensorsDataResponse }) {
    if (!car) return <></>;

    return (
        <Typography sx={{mt: 1, color: 'plat.textDark', fontSize: '12px'}}>
            Двигатель: <Box component="span" sx={{
            color: sensorsData.pin?.[PinStatuses.K2] === 1 ? 'plat.textSuccess' : 'plat.textWarning',
            fontWeight: 700
        }}>
            {sensorsData.pin?.[PinStatuses.K2] === 1 ? 'ЗАПУЩЕН' : 'ЗАГЛУШЕН'}
        </Box>
        </Typography>
    )
}

function StartStopIconWrapper({children}: Readonly<{ children: React.ReactNode; }>) {
    return <Box sx={{
        width: 47,
        height: 47,
        bgcolor: 'plat.bg',
        borderRadius: '50%',
        p: 1,
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
    }}>{children}</Box>;
}

function StartStopIcon({sensorsData, isStartStopExecuting}: {
    sensorsData: MqttSensorsDataResponse,
    isStartStopExecuting: boolean
}) {
    if (isStartStopExecuting) return (
        <StartStopIconWrapper>
            <AutorenewIcon sx={{fontSize: 30, color: 'plat.brandMuted', ...SPIN_ANIMATION}}/>
        </StartStopIconWrapper>
    )
    if (sensorsData.pin?.[PinStatuses.K2] === 1) return (
        <StartStopIconWrapper>
            <StopIcon sx={{fontSize: 30, color: 'plat.brandCopper'}}/>
        </StartStopIconWrapper>);
    return (
        <StartStopIconWrapper>
            <PowerSettingsNewIcon sx={{fontSize: 30, color: 'plat.brandCobalt'}}/>
        </StartStopIconWrapper>
    );
}
