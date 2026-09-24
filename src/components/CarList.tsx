'use client';

import {Box, Typography, Button, IconButton, Paper, Stack} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, {useState} from "react";
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import CarImage from "@/src/components/CarImage";
import SettingsIcon from '@mui/icons-material/Settings';
import {POINT_CUTTING} from "@/src/const/common-sx-styles";
import {CarSettingsDrawer} from "@/src/components/CarSettingsDrawer";

interface CarListProps {
    cars: MqttSettings[];
    onSendSettingsToController: (carSettings: MqttSettings) => void;
    onEdit: (id: string) => void;
    onRemove: (id: string) => void;
    onAddNew: () => void;
}

export default function CarList({cars, onEdit, onRemove, onAddNew, onSendSettingsToController}: CarListProps) {
    const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
    return (
        <Box sx={{bgcolor: 'plat.bg'}}>
            <Stack spacing={2} sx={{maxHeight: 'calc(100dvh - 205px)', overflowY: 'auto'}}>
                {cars.map((car) => (
                    <Paper
                        key={car.id}
                        elevation={0}
                        sx={{
                            p: 1.5,
                            borderRadius: '24px',
                            border: '1px solid #CFD8DC',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            bgcolor: 'white'
                        }}
                    >
                        <Box sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            bgcolor: '#ECEFF1',
                            flexShrink: 0
                        }}>
                            <CarImage carId={car.id}></CarImage>
                        </Box>

                        <Box sx={{flexGrow: 1, overflow: 'hidden'}}>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    color: 'plat.textDark',
                                    ...POINT_CUTTING,
                                }}>{car.name}</Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                color: 'plat.textMuted',
                                ...POINT_CUTTING,
                            }}>{car.server}</Typography>
                        </Box>

                        <IconButton
                            onClick={() => {
                                setSelectedCarId(car.id)
                            }}
                            sx={{color: 'brandCobalt', flexShrink: 0}}>
                            <SettingsIcon fontSize="small"/>
                        </IconButton>
                    </Paper>
                ))}
            </Stack>

            <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon/>}
                size="large"
                sx={{
                    mt: 4,
                    borderRadius: 3,
                    textTransform: 'none',
                }}
                onClick={onAddNew}
            >
                Добавить автомобиль
            </Button>
            {!!selectedCarId &&
                <CarSettingsDrawer carId={selectedCarId} onClose={() => setSelectedCarId(null)} onEdit={onEdit}
                                   onRemove={onRemove} onSendSettings={onSendSettingsToController}></CarSettingsDrawer>
            }
        </Box>
    );
};
