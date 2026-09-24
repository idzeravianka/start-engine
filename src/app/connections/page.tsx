'use client';
import PageContainer from "@/src/components/PageContainer";
import React, {useState} from "react";
import CarList from "../../components/CarList";
import {useRouter} from "next/navigation";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {ConfirmDialog} from "@/src/components/ConfirmDialog";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import {VERTICAL_CENTERING} from "@/src/const/common-sx-styles";

const EMPTY_ARRAY: MqttSettings[] = [];

export default function Connections() {
    const router = useRouter();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState<string | null>(null);
    const cars = useSettingsStore(state => state.settings?.savedEntities ?? EMPTY_ARRAY);
    const removeCarById = useSettingsStore(state => state.removeCarById);

    const handleSendSettingsToController = (carSettings: MqttSettings) => {
        window.open(`http://192.168.4.1/save?mqtt_serv=${carSettings.server}&mqtt_port=${carSettings.tcpPort}&mqtt_login=${carSettings.user}&mqtt_pass=${carSettings.pass}&mqtt=1&prefix=${carSettings.topic}`, '_blank');
    }
    const handleEditCar = (id: string) => router.push(`/connections/setup-connection?id=${id}`);
    const handleAddNewCar = () => router.push(`/connections/setup-connection?id=new`);

    const handleRemoveCarRequest = (id: string) => {
        setCarToDelete(id);
        setDeleteDialogOpen(true);
    }

    const performRemove = () => {
        if (!carToDelete) return;
        removeCarById(carToDelete);
        setDeleteDialogOpen(false);
        setCarToDelete(null);
    };

    return (
        <PageContainer customSx={VERTICAL_CENTERING}>
            <CarList cars={cars} onSendSettingsToController={handleSendSettingsToController} onEdit={handleEditCar}
                     onRemove={handleRemoveCarRequest}
                     onAddNew={handleAddNewCar}/>
            <ConfirmDialog
                open={deleteDialogOpen}
                title="Удалить авто?"
                description="Все настройки данного автомобиля будут удалены."
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={performRemove}
            />
        </PageContainer>
    )
}