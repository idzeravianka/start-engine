'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "@/src/components/selected-car/selected-car-info/SelectedCarInfo";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import RemoteStart from "@/src/components/selected-car/selected-car-start/SelectedCarStart";
import {Box, Typography} from "@mui/material";
import {CarSwitcher} from "@/src/components/car-switcher/CarSwitcher";

export default function Home() {
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    return (
        hasHydrated && (<PageContainer>
            <Box
                sx={{
                    pt: 2,
                    pb: 1,
                    bgcolor: 'plat.bg',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                <CarSwitcher/>
                <Typography sx={{
                    color: 'plat.textDark',
                    fontSize: '14px'
                }}>
                    Engine<Box component="span" sx={{color: 'plat.brandCobalt', fontWeight: 700}}>START</Box>
                </Typography>
            </Box>
            {activeCar && (
                <>
                    <SelectedCarInfo car={activeCar} isConnected={isConnected} updateTime={mqttDataUpdateTime}/>
                    <RemoteStart sensorsData={mqttData}/>
                </>
            )}
        </PageContainer>)
    );
}
