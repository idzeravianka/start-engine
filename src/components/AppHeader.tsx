import {CarSwitcher} from "@/src/components/CarSwitcher";
import {Box, Typography} from "@mui/material";
import React from "react";
import {usePathname} from "next/navigation";

const HEADER_LABEL_CONFIG = {
    '/': <CarSwitcher/>,
    '/settings': 'Настройки',
    '/settings/connections': 'Список автомобилей',
    '/settings/connections/setup-connection': 'Настройки устройства',
    '/sensors': <CarSwitcher/>,
    '/commands': <CarSwitcher/>,
}

type PathNamesType = keyof typeof HEADER_LABEL_CONFIG;

export default function AppHeader() {
    const pathname: PathNamesType = usePathname() as PathNamesType;

    return (
         <Box
            sx={{
                pt: 2,
                pb: 1,
                px: 2,
                fontWeight: 700,
                bgcolor: 'plat.bg',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'plat.textDark',
                fontSize: '16px'
            }}>
            {HEADER_LABEL_CONFIG[pathname]}
            <Typography sx={{
                color: 'plat.textDark',
                fontSize: '16px'
            }}>
                Engine<Box component="span" sx={{color: 'plat.brandCobalt', fontWeight: 700}}>START</Box>
            </Typography>
        </Box>
    )
}