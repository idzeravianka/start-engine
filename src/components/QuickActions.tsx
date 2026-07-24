'use client';

import {Box, Typography} from '@mui/material';
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import React from "react";
import {ActionButton} from "@/src/components/ActionButton";
import {defaultQuickActionButtonsSettings} from "@/src/utils/default-quick-action-buttons-settings";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";

export default function QuickActions({car, sensorsData, disabled}: {
    car: MqttSettings | null,
    sensorsData: MqttSensorsDataResponse,
    disabled?: boolean,
}) {
    return (
        <Box sx={{py: 1, bgcolor: 'plat.bg'}}>
            <Typography variant="overline" sx={{
                color: 'plat.textMuted',
                fontWeight: 700,
                display: 'block',
                fontSize: '12px',
                lineHeight: 1.5,
                mb: 1,
            }}>
                Быстрые действия
            </Typography>
            <Box sx={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between'}}>
                {defaultQuickActionButtonsSettings.map((setting, index) => (
                    <ActionButton onAction={() => setting.onAction(car!.topic, setting.command(sensorsData))}
                                  icon={setting.icon}
                                  key={index}
                                  disabled={disabled}/>))}
            </Box>
        </Box>
    );
}
