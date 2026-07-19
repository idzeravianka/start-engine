'use client';

import { Box, Typography, Paper, Chip } from '@mui/material';
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import CarImage from "@/src/components/CarImage";

export default function SelectedCarInfo({ car, isConnected, updateTime }: { car: MqttSettings, isConnected: boolean, updateTime: string | null }) {
    return (
        <Box sx={{ py: 1, bgcolor: 'plat.bg' }}>
            <Typography variant="overline" sx={{ color: 'plat.textMuted', fontWeight: 700, display: 'block', fontSize: '14px', lineHeight: 1.5  }}>
                Мой автомобиль
            </Typography>
            <Typography sx={{ color: 'plat.textDark', fontSize: '12px', mb: 1 }}>
                {car?.server} {updateTime ? `| Обновлено в: ${updateTime}` : ''}
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    p: 1,
                    borderRadius: '24px',
                    bgcolor: 'white',
                    textAlign: 'center'
                }}
            >
                <Box sx={{
                    width: '100%',
                    aspectRatio: '8/4'
                }}>
                    <CarImage carId={car?.id} />
                </Box>

            <Chip
                label={
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Typography sx={{ fontSize: '12px', color: 'plat.textMuted' }}>
                            Связь:
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '12px',
                                color: isConnected ? 'plat.textSuccess' : 'plat.textWarning',
                            }}
                        >
                            {isConnected ? "Онлайн" : "Оффлайн"}
                        </Typography>
                    </Box>
                }
                sx={{
                    bgcolor: 'transparent',
                    '& .MuiChip-label': { p: 0 }
                }}
            />
            </Paper>
        </Box>
    );
}
