'use client';
import {useParams, useRouter} from "next/navigation";
import {getAllSettings, setSettings} from "@/src/utils/user-settings-store";
import React, {useEffect, useState} from "react";
import NewConnectionForm from "@/src/components/connection-form/NewConnectionForm";
import {ConnectionFormDT} from "@/src/components/connection-form/connection-form.interface";
import PageContainer from "@/src/components/PageContainer";
import {Box} from "@mui/material";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";

export default function EditConnection() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [initialSettingsData, setInitialSettingsData] = useState<MqttSettings | undefined>(undefined);

    useEffect(() => {
        if (id !== 'new') {
            const all = getAllSettings();
            const car = all?.savedEntities.find(c => c.id === id);
            if (car) {
                setInitialSettingsData(() => car);
            }
        }
    }, [id]);

    const save = (val: ConnectionFormDT) => {
        const allSettings = getAllSettings();
        setSettings({selectedEntityId: val.id, savedEntities: [...allSettings?.savedEntities ?? [], val]});
        navigateToCarList();
    }

    const updateExisting = (val: ConnectionFormDT) => {
        const allSettings = getAllSettings()!;
        const updatedSettings = { ...allSettings, savedEntities: allSettings?.savedEntities.map(entity => {
                if (entity.id === val.id) {
                    return {...entity, ...val};
                }
                return entity;
            }) };
        setSettings(updatedSettings);
        navigateToCarList();
    }

    const navigateToCarList = () => {
        router.push(`/settings/connections`);
    };

    return (
        <PageContainer>
            <Box sx={{backgroundColor: 'plat.bg', textAlign: 'center', p: 2}}>Настройки устройства</Box>
            <NewConnectionForm initialData={initialSettingsData} onSave={save} onUpdate={updateExisting}></NewConnectionForm>
        </PageContainer>
    )
}