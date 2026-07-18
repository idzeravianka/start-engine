'use client'
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import SensorsIcon from '@mui/icons-material/Sensors';
import HomeIcon from '@mui/icons-material/Home';
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";

const InitialValueToPathnameMap: Record<string, string> = {
    '/': 'Home',
    '/settings': 'Settings',
}

export default function BottomAppNavigation() {
    const pathname = usePathname();
    const [value, setValue] = useState<string>(InitialValueToPathnameMap[pathname]);
    const router = useRouter();

    return (
        <BottomNavigation
            className="glass"
            showLabels
            value={value}
            onChange={(_, newValue) => {
                if (newValue === 'Home') {
                    router.replace('/');
                }
                ;
                if (newValue === 'Settings') {
                    router.replace('/settings');
                }
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label='Сенсоры' icon={<SensorsIcon/>} value="Actions"/>
            <BottomNavigationAction label='Авто' icon={<HomeIcon/>} value="Home"/>
            <BottomNavigationAction label='Настройки' icon={<SettingsIcon/>} value="Settings"/>
        </BottomNavigation>
    );
}