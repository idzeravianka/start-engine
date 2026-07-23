'use client';

import PageContainer from "@/src/components/PageContainer";
import {Box, Grid} from "@mui/material";
import React from "react";
import {VERTICAL_CENTERING} from "@/src/const/common-sx-styles";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {defaultSensorsSettings} from "@/src/utils/default-dashboard-items-settings";
import SensorItem from "@/src/components/SensorItem";

export default function Sensors() {
    const mqttData = useSettingsStore((state) => state.mqttData);

    return (
        <PageContainer customSx={VERTICAL_CENTERING}>
            <Box sx={{backgroundColor: 'plat.bg', display: 'flex', flexFlow: 'column nowrap', gap: 2}}>
                <Grid container spacing={2}>
                    {Object.values(defaultSensorsSettings).map((val, index) => {
                        return (
                            <Grid size={3} key={index}>
                                <SensorItem icon={val.icon} value={val.getValue(mqttData)} label={val.label}></SensorItem>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </PageContainer>
    );
}
