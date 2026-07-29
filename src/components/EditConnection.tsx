'use client';
import {useRouter, useSearchParams} from "next/navigation";
import React, {useMemo} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {ConnectionFormDT} from "../types/interfaces/connection-form.interface";
import PageContainer from "@/src/components/PageContainer";
import NewConnectionForm from "./NewConnectionForm";

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
        router.push(`/`);
    };

    return (
        <PageContainer>
            <NewConnectionForm
                initialData={initialData}
                onSave={handleSaveOrUpdate} />
        </PageContainer>
    )
}
