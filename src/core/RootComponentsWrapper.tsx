'use client';
import BottomAppNavigation from "@/src/components/BottomAppNavigation";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v16-appRouter";
import {Box, ThemeProvider} from "@mui/material";
import {theme} from "@/src/styles/theme";
import {MqttProvider} from "../components/MqttProvider";
import AppHeader from "@/src/components/AppHeader";
import {useSettingsStore} from "@/src/utils/user-settings-store";

export default function RootComponentsWrapper({children}: Readonly<{ children: React.ReactNode; }>) {
    const hasHydrated = useSettingsStore((state) => state.hasHydrated);

    return (
        hasHydrated && <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider theme={theme}>
                <Box sx={{overflowY: 'auto', height: 'calc(100dvh - 84px)'}}>
                    <MqttProvider>
                        <AppHeader/>
                        {children}
                    </MqttProvider>
                </Box>
                <Box sx={{height: '84px'}}></Box>
                <Box sx={{position: 'fixed', width: '100%', maxWidth: '500px', backgroundColor: 'transparent', bottom: 0 }}>
                    <BottomAppNavigation/>
                </Box>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}