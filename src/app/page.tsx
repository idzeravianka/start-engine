'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "@/src/components/selected-car/selected-car-info/SelectedCarInfo";
import React, {useEffect} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import RemoteStart from "@/src/components/selected-car/selected-car-start/SelectedCarStart";
import {Box, Typography} from "@mui/material";
import {useMqtt} from "@/src/hooks/useMqtt";
import {sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";

export default function Home() {
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const setMqttData = useSettingsStore((state) => state.setMqttData);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    const {reconnect, client, subscribe} = useMqtt(setMqttData);

    useEffect(() => {
        if (activeCar) {
            reconnect(activeCar);
        }
    }, [activeCar, reconnect]);

    useEffect(() => {
        if (!client || !activeCar) return;

        const onConnect = () => {
            subscribe(`${activeCar.topic}/pub`);
            sendCommand(`${activeCar.topic}/sub`, MqttCommands.Update);
        };

        client.on('connect', onConnect);
        return () => {
            client.off('connect', onConnect);
        };
    }, [client, activeCar, subscribe]);

    return (
        <PageContainer>
            <Typography
                sx={{py: 1, color: 'plat.textDark', fontSize: '12px', bgcolor: 'plat.bg', textAlign: 'end'}}>
                Engine<Box component="span" sx={{color: 'plat.brandCobalt', fontWeight: 700}}>START</Box>
            </Typography>
            {hasHydrated && activeCar && (
                <>
                    <SelectedCarInfo car={activeCar} isConnected={isConnected}/>
                    <RemoteStart sensorsData={mqttData}/>
                </>
            )}
        </PageContainer>
    );
}
