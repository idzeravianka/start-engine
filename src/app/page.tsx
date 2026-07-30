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
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {PwaInstallWrapper} from "@/src/components/PwaInstallWrapper";

export default function Home() {
    const router = useRouter();
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    const addNewCar = () => router.push(`/connections/setup-connection?id=new`);

    useEffect(() => {
        if (!activeCar) return;
        sendCommand(`${activeCar.topic}`, MqttCommands.Update);
    }, [activeCar]);

    return (
        <PageContainer customSx={{
            ...VERTICAL_CENTERING,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'space-around'
        }}>
            <SelectedCarInfo car={activeCar} isConnected={!!(isConnected && mqttData.pin.length)}
                             updateTime={mqttDataUpdateTime}/>
            {!activeCar && <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon/>}
                size="large"
                sx={{
                    mt: 2,
                    borderRadius: 3,
                    textTransform: 'none',
                }}
                onClick={() => addNewCar()}
            >
                Добавить автомобиль
            </Button>}
            {activeCar && <>
                <RemoteStart car={activeCar} sensorsData={mqttData}/>
                <QuickActions car={activeCar} disabled={!activeCar || !mqttData.pin.length}
                              sensorsData={mqttData}/>
            </>}
            <PwaInstallWrapper />
        </PageContainer>
    );
}
