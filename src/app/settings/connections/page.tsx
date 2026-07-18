'use client';
import PageContainer from "@/src/components/PageContainer";
import {Box} from "@mui/material";
import React, {useState} from "react";
import CarList from "@/src/components/car-list/CarList";
import {useRouter} from "next/navigation";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {ConfirmDialog} from "@/src/components/confirm-dialog/ConfirmDialog";

export default function Connections() {
    const router = useRouter();

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState<string | null>(null);
    const cars = useSettingsStore(state => state.settings?.savedEntities ?? []);
    const removeCarById = useSettingsStore(state => state.removeCarById);

    const handleEditCar = (id: string) => router.push(`/settings/connections/setup-connection?id=${id}`);
    const handleAddNewCar = () => router.push(`/settings/connections/setup-connection?id=new`);

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
        <PageContainer>
            <Box sx={{backgroundColor: 'plat.bg', textAlign: 'center', p: 2}}>Список автомобилей</Box>
            <CarList cars={cars} onEdit={handleEditCar} onRemove={handleRemoveCarRequest}
                     onAddNew={handleAddNewCar}></CarList>
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