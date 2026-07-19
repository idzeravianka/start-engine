'use client';

import React, {useState} from 'react';
import {Box, Typography, Stack, CircularProgress} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
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

export default function RemoteStart({ car, sensorsData }: {car: MqttSettings | null, sensorsData: MqttSensorsDataResponse | null}) {
    const [holdTimeout, setHoldTimeout] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);
    const haptic = useHaptic();

    const startPress = () => {
        if (!car || !sensorsData) return;

        const holdTime = 1500;
        haptic.impact('medium');
        setHoldTimeout(setTimeout(() => {
            haptic.impact('light');
            clearTimeout(holdTimeout);
            setHoldTimeout(undefined);
        }, holdTime));
    };

    const stopPress = () => {
        clearTimeout(holdTimeout);
        setHoldTimeout(undefined);
    };

    return (
        <Box sx={{py: 1, bgcolor: 'plat.bg', textAlign: 'center'}}>
            <Typography variant="overline" sx={{
                color: 'plat.textMuted',
                fontWeight: 700,
                display: 'block',
                fontSize: '12px',
                lineHeight: 1.5,
                mb: 1,
            }}>
                Удаленный запуск
            </Typography>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Stack spacing={1}>
                    <SensorItem icon={<KeyIcon sx={{fontSize: '16px'}} />} value={sensorsData?.pin?.[PinStatuses.K2] === 1 ? 'ON' : 'OFF'} label="Зажигание" />
                    <SensorItem icon={<ThermostatIcon sx={{fontSize: '16px'}} />} value={`${sensorsData?.temp?.[TemperatureStatuses.Temp1] || '--'} °C`} label="Температура" />
                </Stack>
                <Box sx={{position: 'relative'}}>
                    <Box
                        onTouchStart={startPress}
                        onTouchEnd={stopPress}
                        onMouseDown={startPress}
                        onMouseUp={stopPress}
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
                            value={holdTimeout ? 100 : 0}
                            size={154}
                            thickness={2}
                            sx={{
                                color: 'plat.brandCobalt',
                                position: 'absolute',
                                top: -8,
                                left: -8,
                                pointerEvents: 'none',
                                '& .MuiCircularProgress-circle': {
                                    transition: holdTimeout
                                        ? 'stroke-dashoffset 1500ms linear'
                                        : 'stroke-dashoffset 200ms linear',
                                }
                            }}
                        />
                        <PowerSettingsNewIcon sx={{fontSize: 40, color: 'plat.brandCobalt'}}/>

                        <Typography variant="overline" sx={{
                            color: 'plat.textMuted',
                            fontWeight: 700,
                            display: 'block',
                            fontSize: '12px',
                            lineHeight: 1.5
                        }}>
                            Запуск
                        </Typography>
                    </Box>
                </Box>
                <Stack spacing={1}>
                    <SensorItem icon={<BatteryCharging80Icon sx={{fontSize: '16px'}} />} value={`${sensorsData?.pin?.[PinStatuses.Voltage] || '--'} V`} label="Заряд АКБ" />
                    <SensorItem icon={<AvTimerIcon sx={{fontSize: '16px'}} />} value='--.--' label="Таймер" />
                </Stack>
            </Box>

            <EngineStatus car={car} sensorsData={sensorsData} />
        </Box>
    );
}

function EngineStatus({ car, sensorsData }: {car: MqttSettings | null, sensorsData: MqttSensorsDataResponse | null}) {
    if (!car) return <></>;

    return (
        <Typography sx={{ mt: 1, color: 'plat.textDark', fontSize: '12px' }}>
            Двигатель: <Box component="span" sx={{ color: false ? 'plat.textSuccess' : 'plat.textWarning', fontWeight: 700 }}>ЗАГЛУШЕН</Box>
        </Typography>
    )
}
