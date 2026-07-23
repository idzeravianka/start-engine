'use client';

import {Box, Typography, Paper, Chip} from '@mui/material';
import {MqttSettings} from "@/src/types/interfaces/mqtt-settings";
import CarImage from "@/src/components/CarImage";
import {POINT_CUTTING} from "@/src/const/common-sx-styles";

export default function SelectedCarInfo({car, isConnected, updateTime}: {
    car: MqttSettings | null,
    isConnected: boolean,
    updateTime: string | null
}) {
    return (
        <Box sx={{py: 1, bgcolor: 'plat.bg'}}>
            <Typography variant="overline" sx={{
                color: 'plat.textMuted',
                fontWeight: 700,
                display: 'block',
                fontSize: '14px',
                lineHeight: 1.5
            }}>
                Мой автомобиль
            </Typography>
            <CarUpdateDate car={car} updateTime={updateTime}/>
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
                    <CarImage carId={car?.id}/>
                </Box>

                <IsConnectedChip car={car} isConnected={isConnected}/>
            </Paper>
        </Box>
    );
}

function CarUpdateDate({car, updateTime}: { car: MqttSettings | null, updateTime: string | null }) {
    if (!car) {
        return (
            <Typography sx={{color: 'plat.textDark', fontSize: '12px', mb: 1}}>
                Подключение к автомобилю не настроено
            </Typography>
        )
    }
    return (
        <Box sx={{display: 'flex', flexFlow: 'row nowrap', gap: 0.5, color: 'plat.textDark', fontSize: '12px', mb: 1}}>
            <Typography sx={{color: 'plat.textDark', fontSize: '12px', maxWidth: '120px', ...POINT_CUTTING}}>
                {car.server}
            </Typography>
            <Typography sx={{color: 'plat.textDark', fontSize: '12px'}}>
                {updateTime ? `| Обновлено в: ${updateTime}` : ''}
            </Typography>
        </Box>

    )
}

function IsConnectedChip({car, isConnected}: { car: MqttSettings | null, isConnected: boolean }) {
    if (!car) return <></>;

    return (
        <Chip
            label={
                <Box sx={{display: 'flex', gap: 0.5}}>
                    <Typography sx={{fontSize: '12px', color: 'plat.textMuted'}}>
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
                '& .MuiChip-label': {p: 0}
            }}
        />
    )
}