import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        plat: {
            bg: string;
            card: string;
            border: string;
            textDark: string;
            textMuted: string;
            textSuccess: string;
            textWarning: string;
            brandCobalt: string;
            brandCobaltHover: string;
            brandCopper: string;
            brandMuted: string;
        };
    }
    interface PaletteOptions {
        plat?: {
            bg: string;
            card: string;
            border: string;
            textDark: string;
            textMuted: string;
            textSuccess: string;
            textWarning: string;
            brandCobalt: string;
            brandCobaltHover: string;
            brandCopper: string;
            brandMuted: string;
        };
    }
}

export const theme = createTheme({
    palette: {
        plat: {
            bg: '#ECEFF1',
            card: '#FFFFFF',
            border: '#CFD8DC',
            textDark: '#1E293B',
            textMuted: '#64748B',
            textSuccess: '#2E7D32',
            textWarning: '#D84315',
            brandCobalt: '#1E40AF',
            brandCobaltHover: '#1D4ED8',
            brandCopper: '#C2410C',
            brandMuted: '#64748B',
        },
        background: {
            default: '#ECEFF1',
            paper: '#FFFFFF',
        },
        primary: {
            main: '#1E40AF',
        },
        secondary: {
            main: '#C2410C',
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
    },
    typography: {
        fontFamily: '"Inter", "Montserrat", "JetBrains Mono", sans-serif',
    },
});
