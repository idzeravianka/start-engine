'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "@/src/components/selected-car/selected-car-info/SelectedCarInfo";
import React, {useCallback, useEffect, useState} from "react";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {getActiveCar} from "@/src/utils/user-settings-store";
import RemoteStart from "@/src/components/selected-car/selected-car-start/SelectedCarStart";
import {Box, Typography} from "@mui/material";
import {useMqtt} from "@/src/hooks/useMqtt";
import {disconnectMqtt, sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";

export default function Home() {
    const [isReady, setIsReady] = useState(false);
    const [sensorsData, setSensorsData] = useState<MqttSensorsDataResponse | null>(null);
    useEffect(() => {
        setIsReady(true);
    }, []);

    const handleEngineUpdate = useCallback((sensorsData: MqttSensorsDataResponse) => {
        setSensorsData(sensorsData);
    }, []);
    const [activeCar, setActiveCar] = useState<MqttSettings | null>(getActiveCar());
    const {reconnect, client, isConnected, subscribe} = useMqtt(handleEngineUpdate);

    useEffect(() => {
        if (activeCar) {
            reconnect(activeCar);
        }

        return () => {
            disconnectMqtt();
        }
    }, [activeCar, reconnect]);

    useEffect(() => {
        const onConnect = () => {
            subscribe(`${activeCar!.topic}/pub`);
            sendCommand(`${activeCar!.topic}/sub`, MqttCommands.Update);
        };

        client?.on('connect', onConnect);

        return () => {
            client?.off('connect', onConnect);
        };
    }, [client, subscribe]);

    return (
        <PageContainer>
            <Typography sx={{py: 1, color: 'plat.textDark', fontSize: '12px', bgcolor: 'plat.bg', textAlign: 'end'}}>
                Engine<Box component="span" sx={{color: 'plat.brandCobalt', fontWeight: 700}}>START</Box>
            </Typography>
            {isReady && activeCar && (
                <>
                    <SelectedCarInfo car={activeCar} isConnected={!!isConnected}/>
                    <RemoteStart sensorsData={sensorsData}/>
                </>
            )}
        </PageContainer>
    );
}
