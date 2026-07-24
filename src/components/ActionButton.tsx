'use client';
import React, { useState, useRef } from 'react';
import {Box, Button, Typography} from "@mui/material";

export const ActionButton = ({ label, status, icon, disabled, onAction }: { label?: string, status?: string, icon?: React.ReactNode, disabled?: boolean, onAction: () => void }) => {
    const [isHolding, setIsHolding] = useState(false);
    const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const start = () => {
        if (isHolding) return;

        setIsHolding(true);
        holdTimeoutRef.current = setTimeout(() => {
            onAction();
            setIsHolding(false);
            holdTimeoutRef.current = null
        }, 1000);
    };

    const stop = () => {
        if (holdTimeoutRef.current) {
            clearTimeout(holdTimeoutRef.current);
            holdTimeoutRef.current = null;
        }
        setIsHolding(false);
    };

    return (
        <Button
            disableElevation
            disableRipple
            onTouchStart={start}
            onTouchEnd={stop}
            onMouseDown={start}
            onMouseUp={stop}
            onMouseLeave={stop}
            disabled={disabled}
            sx={{
                p: 0.5,
                width: '100%',
                height: 65,
                minWidth: 65,
                borderRadius: 3,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'plat.card',
                '&:hover': { bgcolor: 'plat.card' },
                transition: 'transform 0.1s',
                '&:active': { transform: 'scale(0.95)' },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: 'plat.brandCobalt',
                    opacity: 0.15,
                    transform: isHolding ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
                    transformOrigin: 'center center',
                    transition: isHolding ? 'transform 1000ms linear' : 'transform 200ms ease-out',
                    pointerEvents: 'none',
                },
                '& .MuiSvgIcon-root': {
                    color: isHolding ? 'plat.brandCobalt' : 'plat.textDark',
                    transition: 'color 0.3s'
                }
            }}
        >
            {icon && <Box sx={{'& .MuiSvgIcon-root': {color: 'plat.textMuted'}}}>{icon}</Box>}
            {status && <Typography sx={{fontSize: '12px', fontWeight: 700, color: 'plat.textDark'}}>{status}</Typography>}
            {label && <Typography sx={{fontSize: '10px', color: 'plat.textDark', textAlign: 'center', textTransform: 'none'}}>{label}</Typography>}
        </Button>
    );
};