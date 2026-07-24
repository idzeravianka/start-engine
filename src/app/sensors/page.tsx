'use client';

import PageContainer from "@/src/components/PageContainer";
import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {defaultSensorsSettings} from "@/src/utils/default-dashboard-items-settings";
import SensorItem from "@/src/components/SensorItem";
import {defaultQuickActionButtonsSettings} from "@/src/utils/action-buttons-settings";
import {ActionButton} from "@/src/components/ActionButton";

export default function Sensors() {
    const mqttData = useSettingsStore((state) => state.mqttData);
    const activeCar = useSettingsStore(state => state.getActiveCar());

    return (
        <PageContainer>
            <Box sx={{backgroundColor: 'plat.bg', display: 'flex', flexFlow: 'column nowrap', py: 1}}>
                <Typography variant="overline" sx={{
                    color: 'plat.textMuted',
                    fontWeight: 700,
                    display: 'block',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    mb: 1,
                }}>
                    Информация с устройства
                </Typography>
                <Grid container spacing={2}>
                    {Object.values(defaultSensorsSettings).map((val, index) => {
                        return (
                            <Grid size={4} key={index}>
                                <SensorItem icon={val.icon} value={val.getValue(mqttData)} label={val.label}></SensorItem>
                            </Grid>
                        )
                    })}
                </Grid>
                <Typography variant="overline" sx={{
                    color: 'plat.textMuted',
                    fontWeight: 700,
                    display: 'block',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    my: 1,
                }}>
                    Команды для отправки
                </Typography>
                <Grid container spacing={2}>
                    {defaultQuickActionButtonsSettings.map((setting, index) => {
                        return (
                            <Grid size={4} key={index}>
                                <ActionButton onAction={() => setting.onAction(activeCar!.topic, setting.command(mqttData))}
                                              icon={setting.icon}
                                              disabled={!activeCar || !mqttData.pin.length}
                                              label={setting.label}
                                              status={setting.status?.(mqttData)}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </PageContainer>
    );
}
