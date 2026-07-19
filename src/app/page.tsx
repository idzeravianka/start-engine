'use client';
import PageContainer from "@/src/components/PageContainer";
import SelectedCarInfo from "../components/SelectedCarInfo";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import RemoteStart from "../components/SelectedCarStart";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";
import {useRouter} from "next/navigation";
import {VERTICAL_CENTERING} from "@/src/const/vertical-centering";

export default function Home() {
    const router = useRouter();
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const mqttData = useSettingsStore((state) => state.mqttData);
    const mqttDataUpdateTime = useSettingsStore((state) => state.mqttDataUpdateTime);
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');

    const addNewCar = () => router.push(`/settings/connections/setup-connection?id=new`);

    if (!activeCar) {
        return <PageContainer customSx={VERTICAL_CENTERING}>
            <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon/>}
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                }}
                onClick={() => addNewCar()}
            >
                Добавить подключение
            </Button>
        </PageContainer>;
    }

    return (
        hasHydrated && (<PageContainer>
            <SelectedCarInfo car={activeCar} isConnected={isConnected} updateTime={mqttDataUpdateTime}/>
            <RemoteStart sensorsData={mqttData}/>
        </PageContainer>)
    );
}
