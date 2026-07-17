'use client';

import PageContainer from "@/src/components/PageContainer";
import {Box, Button} from "@mui/material";
import React from "react";
import {useRouter} from "next/navigation";

export default function Settings() {
    const router = useRouter();

    const handleDevicesNavigation = () => {
        router.push(`/settings/connections`);
    };

    return (
        <PageContainer>
            <Box sx={{backgroundColor: 'plat.bg', textAlign: 'center', p: 2}}>Настройки</Box>
            <Box sx={{backgroundColor: 'plat.bg', display: 'flex', flexFlow: 'column nowrap', gap: 2}}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                    }}
                    onClick={handleDevicesNavigation}
                >
                    Устройства
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                    }}
                >
                    Телеграмм
                </Button>
            </Box>
        </PageContainer>
    );
}
