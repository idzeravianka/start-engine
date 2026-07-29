'use client';
import {Box, Button, Drawer, Typography} from "@mui/material";
import React from "react";
import {useRouter} from "next/navigation";

export function SettingsDrawer({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) {
    const router = useRouter();

    const handleDevicesNavigation = () => {
        router.push(`/connections`);
        onClose();
    };

    const openTelegram = () => {
        window.open("https://t.me/+Vw4C60B8Yqob_JWc", "_blank");
        onClose();
    }

    return <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        sx={{'& .MuiDrawer-paper': {borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 2}}}
    >
        <Typography sx={{mb: 1, textAlign: 'center'}}>
            Настройки и поддержка
        </Typography>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', gap: 2}}>
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
                Автомобили
            </Button>
            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    mb: 1,
                }}
                onClick={openTelegram}
            >
                Телеграмм
            </Button>
        </Box>
    </Drawer>
}