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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100dvh',
                }}>
                    <Box sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        backgroundColor: 'plat.bg'
                    }}>
                        <MqttProvider>
                            <AppHeader />
                            {children}
                        </MqttProvider>
                    </Box>

                    <Box sx={{backgroundColor: 'plat.bg'}}>
                        <BottomAppNavigation/>
                    </Box>
                </Box>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}