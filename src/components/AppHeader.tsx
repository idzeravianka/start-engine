'use client';

import {CarSwitcher} from "@/src/components/CarSwitcher";
import {Box} from "@mui/material";
import React, {useState} from "react";
import {usePathname} from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import {SettingsDrawer} from "@/src/components/SettingsDrawer";

const HEADER_LABEL_CONFIG = {
    '/': <CarSwitcher/>,
    '/connections': 'Список автомобилей',
    '/connections/setup-connection': 'Настройки устройства',
    '/sensors': <CarSwitcher/>,
    '/commands': <CarSwitcher/>,
}

type PathNamesType = keyof typeof HEADER_LABEL_CONFIG;

export default function AppHeader() {
    const [open, setOpen] = useState(false);
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
            {!pathname.includes('connections') && <MenuIcon sx={{fontSize: '28px'}} onClick={() => setOpen(true)}/>}
            <SettingsDrawer isOpen={open} onClose={() => setOpen(false)} />
        </Box>
    )
}