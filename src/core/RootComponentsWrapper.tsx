'use client';
import BottomAppNavigation from "@/src/components/BottomAppNavigation";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v16-appRouter";
import {Box, ThemeProvider, Typography} from "@mui/material";
import {theme} from "@/src/styles/theme";
import {MqttProvider} from "../components/MqttProvider";
import AppHeader from "@/src/components/AppHeader";
import {useSettingsStore} from "@/src/utils/user-settings-store";
import PullToRefresh from "react-simple-pull-to-refresh";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {SPIN_ANIMATION} from "@/src/const/common-sx-styles";
import {sendCommand} from "@/src/utils/mqtt-client";
import {MqttCommands} from "@/src/types/enums/mqtt-commands";
import {useEffect, useRef} from "react";

export default function RootComponentsWrapper({children}: Readonly<{ children: React.ReactNode; }>) {
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);
    const activeCar = useSettingsStore((state) => state.getActiveCar());
    const isConnected = useSettingsStore(state => state.mqttStatus === 'connected');
    const mqttData = useSettingsStore((state) => state.mqttData);

    const resolveRef = useRef<(() => void) | null>(null);

    const resolveRefresh = () => {
        if (resolveRef.current) {
            resolveRef.current();
            resolveRef.current = null;
        }
    };

    useEffect(() => {
        resolveRefresh()
    }, [mqttData]);

    const onSettingsRefresh = (): Promise<void> => {
        if (!activeCar) return Promise.resolve();

        return new Promise<void>((resolve) => {
            resolveRef.current = resolve;
            sendCommand(`${activeCar.topic}`, MqttCommands.Update);

            setTimeout(() => {
                resolveRefresh();
            }, 10000);
        });
    };

    return (
        hasHydrated && <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
                <Box sx={{overflowY: 'auto', height: 'calc(100dvh - 84px)'}}>
                    <MqttProvider>
                        <AppHeader/>
                        <PullToRefresh onRefresh={onSettingsRefresh}
                                       isPullable={!!(isConnected && mqttData.pin.length)}
                                       refreshingContent={<RefreshingContent/>}
                                       pullingContent={<PullingContent/>}
                                       className='pull-to-refresh'>{children}</PullToRefresh>
                    </MqttProvider>
                </Box>
                <Box sx={{height: '84px'}}></Box>
                <Box sx={{
                    position: 'fixed',
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: 'transparent',
                    bottom: 0
                }}>
                    <BottomAppNavigation/>
                </Box>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}

function RefreshingContent() {
    return <AutorenewIcon sx={{fontSize: 30, color: 'plat.brandMuted', ...SPIN_ANIMATION}}/>
}

function PullingContent() {
    return <Box sx={{display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center'}}>
        <ArrowDownwardIcon sx={{
            fontSize: 30,
            color: 'plat.brandMuted',
        }}/>
        <Typography sx={{fontSize: '10px', color: 'plat.textDark', textAlign: 'center'}}>Потяните, чтобы
            обновить</Typography>
    </Box>
}