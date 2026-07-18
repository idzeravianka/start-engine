'use client';
import {useRouter, useSearchParams} from "next/navigation";
import React, {useMemo} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {ConnectionFormDT} from "@/src/components/connection-form/connection-form.interface";
import PageContainer from "@/src/components/PageContainer";
import {Box} from "@mui/material";
import NewConnectionForm from "@/src/components/connection-form/NewConnectionForm";

export default function EditConnection() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const allSettings = useSettingsStore(state => state.settings);
    const addOrUpdate = useSettingsStore(state => state.addOrUpdateConnection);

    const initialData = useMemo(() =>
            allSettings?.savedEntities.find(c => c.id === id),
        [allSettings, id]);

    const handleSaveOrUpdate = (val: ConnectionFormDT) => {
        addOrUpdate(val);
        router.push(`/settings/connections`);
    };

    return (
        <PageContainer>
            <Box sx={{backgroundColor: 'plat.bg', textAlign: 'center', p: 2}}>Настройки устройства</Box>
            <NewConnectionForm
                initialData={initialData}
                onSave={handleSaveOrUpdate} />
        </PageContainer>
    )
}
