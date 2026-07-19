'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "../components/SelectedCarInfo";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import RemoteStart from "../components/SelectedCarStart";

export default function Home() {
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    return (
        hasHydrated && (<PageContainer>
            <SelectedCarInfo car={activeCar} isConnected={isConnected} updateTime={mqttDataUpdateTime}/>
            <RemoteStart sensorsData={mqttData}/>
        </PageContainer>)
    );
}
