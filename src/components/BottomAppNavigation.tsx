'use client'
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import SensorsIcon from '@mui/icons-material/Sensors';
import SensorsOffIcon from '@mui/icons-material/SensorsOff';
import LayersIcon from '@mui/icons-material/Layers';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import HomeIcon from '@mui/icons-material/Home';
import {usePathname, useRouter} from "next/navigation";
import {useSettingsStore} from "@/src/utils/user-settings-store";

export default function BottomAppNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const activeCar = useSettingsStore(state => state.getActiveCar());

    const getCurrentTab = () => {
        if (pathname.includes('/sensors')) return 'Sensors';
        if (pathname.includes('/commands')) return 'Commands';
        return 'Home';
    };

    return (
        <BottomNavigation
            className="glass"
            showLabels
            value={getCurrentTab()}
            onChange={(_, newValue) => {
                if (newValue === 'Home') router.replace('/');
                if (newValue === 'Sensors') router.replace('/sensors');
                if (newValue === 'Commands') router.replace('/commands');
            }}
        >
            <BottomNavigationAction label='Данные' icon={activeCar ? <SensorsIcon/> : <SensorsOffIcon/>} value="Sensors" disabled={!activeCar} />
            <BottomNavigationAction label='Авто' icon={<HomeIcon/>} value="Home"/>
            <BottomNavigationAction label='Команды' icon={activeCar ? <LayersIcon/> : <LayersClearIcon/>} value="Commands" disabled={!activeCar} />
        </BottomNavigation>
    );
}