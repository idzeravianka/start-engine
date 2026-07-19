'use client'
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import SensorsIcon from '@mui/icons-material/Sensors';
import HomeIcon from '@mui/icons-material/Home';
import {usePathname, useRouter} from "next/navigation";

export default function BottomAppNavigation() {
    const pathname = usePathname();
    const router = useRouter();

    const getCurrentTab = () => {
        if (pathname.includes('/settings')) return 'Settings';
        if (pathname.includes('/actions')) return 'Actions';
        return 'Home';
    };

    return (
        <BottomNavigation
            className="glass"
            showLabels
            value={getCurrentTab()}
            onChange={(_, newValue) => {
                if (newValue === 'Home') router.replace('/');
                if (newValue === 'Settings') router.replace('/settings');
                if (newValue === 'Actions') router.replace('/actions');
            }}
        >
            <BottomNavigationAction label='Сенсоры' icon={<SensorsIcon/>} value="Actions" />
            <BottomNavigationAction label='Авто' icon={<HomeIcon/>} value="Home"/>
            <BottomNavigationAction label='Настройки' icon={<SettingsIcon/>} value="Settings"/>
        </BottomNavigation>
    );
}