'use client';

import PageContainer from "@/src/components/PageContainer";
import {Box, Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {defaultSensorsSettings} from "@/src/utils/default-dashboard-items-settings";
import SensorItem from "@/src/components/SensorItem";
import {VERTICAL_CENTERING} from "@/src/const/common-sx-styles";
import {sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {DashboardItemNames} from "@/src/types/enums/dashboard-item-names";
import {TimerItem} from "../../components/TimerItem";

export default function Sensors() {
    const mqttData = useSettingsStore((state) => state.mqttData);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const activeCar = useSettingsStore(state => state.getActiveCar());

    useEffect(() => {
        if (!activeCar) return;
        sendCommand(`${activeCar.topic}`, MqttCommands.Update);
    }, [activeCar]);

    return (
        <PageContainer customSx={VERTICAL_CENTERING}>
            <Typography variant="overline" sx={{
                color: 'plat.textMuted',
                fontWeight: 700,
                display: 'block',
                fontSize: '14px',
                lineHeight: 1.5,
            }}>
                Данные с устройства
            </Typography>
            <Box sx={{display: 'flex', gap: 0.5}}>
                <Typography sx={{fontSize: '12px', color: 'plat.textDark'}}>
                    Связь:
                </Typography>
                <Typography
                    sx={{
                        fontSize: '12px',
                        color: isConnected && mqttData.pin.length ? 'plat.textSuccess' : 'plat.textWarning',
                        mb: 1,
                    }}
                >
                    {isConnected && mqttData.pin.length ? "Онлайн" : "Оффлайн"}
                </Typography>
                <Typography sx={{color: 'plat.textDark', fontSize: '12px'}}>
                    {mqttDataUpdateTime ? `| Обновлено в: ${mqttDataUpdateTime}` : ''}
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {Object.entries(defaultSensorsSettings).map(([key, val], index) => {
                    const elementToRender = key === DashboardItemNames.Timer ?
                        <TimerItem sensorsData={mqttData} label={val.label}/> :
                        <SensorItem icon={val.icon} value={val.getValue(mqttData)} label={val.label}/>;

                    return (
                        <Grid size={4} key={index}>
                            {elementToRender}
                        </Grid>
                    )
                })}
            </Grid>
        </PageContainer>
    );
}
