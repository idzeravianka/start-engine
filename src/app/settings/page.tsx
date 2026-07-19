'use client';

import PageContainer from "@/src/components/PageContainer";
import {Box, Button} from "@mui/material";
import React from "react";
import {useRouter} from "next/navigation";
import {VERTICAL_CENTERING} from "@/src/const/common-sx-styles";

export default function Settings() {
    const router = useRouter();

    const handleDevicesNavigation = () => {
        router.push(`/settings/connections`);
    };

    const openTelegram = () => {
        window.open("https://t.me/+Vw4C60B8Yqob_JWc", "_blank");
    }

    return (
        <PageContainer customSx={VERTICAL_CENTERING}>
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
                    onClick={openTelegram}
                >
                    Телеграмм
                </Button>
            </Box>
        </PageContainer>
    );
}
