import {CarSwitcher} from "@/src/components/CarSwitcher";
import {Box, Typography} from "@mui/material";
import React from "react";
import {usePathname} from "next/navigation";
import {useSettingsStore} from "@/src/utils/user-settings-store";

const HEADER_LABEL_CONFIG = {
    '/': <CarSwitcher/>,
    '/settings': 'Настройки',
    '/settings/connections': 'Список автомобилей',
    '/settings/connections/setup-connection': 'Настройки устройства',
}

type PathNamesType = keyof typeof HEADER_LABEL_CONFIG;

export default function AppHeader() {
    const pathname: PathNamesType = usePathname() as PathNamesType;
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);

    return (
        hasHydrated && <Box
            sx={{
                pt: 2,
                pb: 1,
                px: 2,
                bgcolor: 'plat.bg',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            {HEADER_LABEL_CONFIG[pathname]}
            <Typography sx={{
                color: 'plat.textDark',
                fontSize: '14px'
            }}>
                Engine<Box component="span" sx={{color: 'plat.brandCobalt', fontWeight: 700}}>START</Box>
            </Typography>
        </Box>
    )
}