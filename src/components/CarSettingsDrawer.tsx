'use client';
import {Box, Button, Drawer, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import {POINT_CUTTING} from "@/src/const/common-sx-styles";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";

export function CarSettingsDrawer({carId, onClose, onEdit, onRemove, onSendSettings}: {
    carId: string,
    onClose: () => void,
    onEdit: (carId: string) => void,
    onRemove: (carId: string) => void,
    onSendSettings: (carId: MqttSettings) => void
}) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedCar = useSettingsStore(state => state.getCarById(carId));

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const sendSettingsToController = () => {
        onSendSettings(selectedCar);
        onClose();
    }

    const editSettings = () => {
        onEdit(carId);
        onClose();
    }

    const removeSettings = () => {
        onRemove(carId);
        onClose();
    }

    return <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={onClose}
        sx={{'& .MuiDrawer-paper': {borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 2}}}
    >
        <Box sx={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', gap: 2}}>
            <Typography sx={{
                mb: 0.5, textAlign: 'center',
                fontWeight: 700,
                color: 'plat.textDark',
                ...POINT_CUTTING,
            }}>
                {selectedCar.name}
            </Typography>
            {selectedCar.tcpPort && <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                }}
                startIcon={<SendToMobileIcon/>}
                onClick={sendSettingsToController}
            >
                Отправить в контроллер
            </Button>}
            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                }}
                startIcon={<EditNoteIcon/>}
                onClick={editSettings}
            >
                Редактировать
            </Button>
            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                }}
                startIcon={<DeleteIcon/>}
                onClick={removeSettings}
                color="error"
            >
                Удалить
            </Button>
        </Box>
    </Drawer>
}