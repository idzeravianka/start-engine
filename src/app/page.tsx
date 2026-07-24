'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "../components/SelectedCarInfo";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import RemoteStart from "../components/SelectedCarStart";
import QuickActions from "@/src/components/QuickActions";

export default function Home() {
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    return (
        <PageContainer>
            <SelectedCarInfo car={activeCar} isConnected={isConnected} updateTime={mqttDataUpdateTime}/>
            <RemoteStart car={activeCar} sensorsData={mqttData}/>
            <QuickActions car={activeCar} disabled={!activeCar || !mqttData.pin.length} sensorsData={mqttData}></QuickActions>
        </PageContainer>
    );
}
