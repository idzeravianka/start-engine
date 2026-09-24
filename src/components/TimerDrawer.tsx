'use client';
import {Box, Button, Drawer, Slider, Typography} from "@mui/material";
import React from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import {sendCommand} from "@/src/utils/mqtt-client";

export function TimerDrawer({isOpen, onClose}: { isOpen: boolean, onClose: () => void }) {
    const [newTimerValue, setNewTimerValue] = React.useState<number>(10);

    const activeCar = useSettingsStore((state) => state.getActiveCar());

    const handleChange = (_: Event, newValue: number) => {
        setNewTimerValue(newValue);
    };

    const sendTimerValue = () => {
        if (!activeCar) return;
        sendCommand(`${activeCar.topic}`, `timer=${newTimerValue}`);
        onClose();
    };

    return <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        sx={{'& .MuiDrawer-paper': {borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 2}}}
    >
        <Typography sx={{mb: 1, textAlign: 'center'}}>
            Время работы: {newTimerValue} минут
        </Typography>
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', gap: 2}}>
            <Slider
                aria-label="Temperature"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={45}
                sx={{
                    maxWidth: '80%',
                }}
                value={newTimerValue}
                onChange={handleChange}
            />

            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    mb: 1,
                }}
                onClick={sendTimerValue}
            >
                Установить
            </Button>
        </Box>
    </Drawer>
}