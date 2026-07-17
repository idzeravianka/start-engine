'use client'
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import AltRouteIcon from '@mui/icons-material/AltRoute';
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
            <BottomNavigationAction label="Actions" icon={<AltRouteIcon/>} value="Actions"/>
            <BottomNavigationAction label="Home" icon={<HomeIcon/>} value="Home"/>
            <BottomNavigationAction label="Settings" icon={<SettingsIcon/>} value="Settings"/>
        </BottomNavigation>
    );
}