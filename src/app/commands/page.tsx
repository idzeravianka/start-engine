'use client';

import PageContainer from "@/src/components/PageContainer";
import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {defaultQuickActionButtonsSettings} from "@/src/utils/action-buttons-settings";
import {ActionButton} from "@/src/components/ActionButton";
import {VERTICAL_CENTERING} from "@/src/const/common-sx-styles";

export default function Commands() {
    const mqttData = useSettingsStore((state) => state.mqttData);
    const activeCar = useSettingsStore(state => state.getActiveCar());
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);

    return (
        <PageContainer customSx={VERTICAL_CENTERING}>
            <Typography variant="overline" sx={{
                color: 'plat.textMuted',
                fontWeight: 700,
                display: 'block',
                fontSize: '14px',
                lineHeight: 1.5,
            }}>
                Команды для отправки
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
        </PageContainer>
    );
}
