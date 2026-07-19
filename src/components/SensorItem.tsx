'use client';
import React from "react";
import {Box, Paper, Typography} from "@mui/material";

export default function SensorItem({icon, value, label}: { icon: React.ReactNode, value: string, label: string }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 0.5,
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'plat.border',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 65,
                minHeight: 65,
                width: '100%',
                height: '100%',
            }}
        >
            <Box sx={{color: 'plat.textMuted'}}>{icon}</Box>
            <Typography sx={{fontSize: '12px', fontWeight: 700, color: 'plat.textDark'}}>{value}</Typography>
            {/*<Typography sx={{fontSize: '10px', color: 'plat.textDark'}}>{label}</Typography>*/}
        </Paper>
    );
}