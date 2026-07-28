'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "../components/SelectedCarInfo";
import React, {useEffect} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import RemoteStart from "../components/SelectedCarStart";
import QuickActions from "@/src/components/QuickActions";
import {VERTICAL_CENTERING} from "@/src/const/common-sx-styles";
import {sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";

export default function Home() {
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    useEffect(() => {
        if (!activeCar) return;
        sendCommand(`${activeCar.topic}`, MqttCommands.Update);
    }, [activeCar]);

    return (
        <PageContainer customSx={{...VERTICAL_CENTERING, display: 'flex', flexFlow: 'column nowrap', justifyContent: 'space-around'}}>
            <SelectedCarInfo car={activeCar} isConnected={!!(isConnected && mqttData.pin.length)} updateTime={mqttDataUpdateTime}/>
            <RemoteStart car={activeCar} sensorsData={mqttData}/>
            <QuickActions car={activeCar} disabled={!activeCar || !mqttData.pin.length} sensorsData={mqttData}></QuickActions>
        </PageContainer>
    );
}
