'use client';
import React, {useState} from 'react';
import {Button, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Typography} from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import AddIcon from "@mui/icons-material/Add";
import {useRouter} from "next/navigation";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import CarImage from "@/src/components/CarImage";

export const CarSwitcher = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const {settings, setActiveCarId} = useSettingsStore();
    const activeCar = useSettingsStore(state => state.getActiveCar());

    const addNewCar = () => router.push(`/connections/setup-connection?id=new`);

    if (!settings || !activeCar) return <Typography sx={{
        color: 'plat.textDark',
        fontSize: '16px'
    }}>
        Engine<Box component="span" sx={{color: 'plat.brandCobalt', fontWeight: 700}}>START</Box>
    </Typography>;

    return (
        <Box>
            <Button
                onClick={() => setOpen(true)}
                endIcon={<UnfoldMoreIcon fontSize='inherit'/>}
                sx={{
                    color: 'plat.textDark',
                    fontWeight: 700,
                    textTransform: 'none',
                    p: 0,
                    fontSize: '16px',
                    '& .MuiSvgIcon-root': {fontSize: '16px !important'}
                }}
            >
                {activeCar.name}
            </Button>

            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => setOpen(false)}
                sx={{'& .MuiDrawer-paper': {borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 2}}}
            >
                <Typography sx={{mb: 1, textAlign: 'center'}}>
                    Выберите автомобиль
                </Typography>
                <List>
                    {settings.savedEntities.map((car) => (
                        <ListItem key={car.id} disablePadding>
                            <ListItemButton
                                selected={car.id === activeCar.id}
                                onClick={() => {
                                    setActiveCarId(car.id);
                                    setOpen(false);
                                }}
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <Box sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    flexShrink: 0
                                }}>
                                    <CarImage carId={car.id} />
                                </Box>
                                <ListItemText primary={car.name} secondary={car.server}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon/>}
                        size="large"
                        sx={{
                            mt: 2,
                            borderRadius: 3,
                            textTransform: 'none',
                        }}
                        onClick={() => addNewCar()}
                    >
                        Добавить автомобиль
                    </Button>
                </List>
            </Drawer>
        </Box>
    );
};