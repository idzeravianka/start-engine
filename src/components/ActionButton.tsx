'use client';
import { useState, useRef } from 'react';
import {Button} from "@mui/material";

export const ActionButton = ({ icon, disabled, onAction }: { icon: React.ReactNode, disabled?: boolean, onAction: () => void }) => {
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
                width: 65,
                height: 65,
                minWidth: 65,
                borderRadius: 3,
                position: 'relative',
                display: 'flex',
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
                    width: isHolding ? '100%' : '0%',
                    height: isHolding ? '100%' : '0%',
                    marginTop: isHolding ? '-50%' : '0%',
                    marginLeft: isHolding ? '-50%' : '0%',
                    bgcolor: 'plat.brandCobalt',
                    opacity: 0.15,
                    borderRadius: 3,
                    transition: isHolding
                        ? 'width 1000ms linear, height 1000ms linear, margin-top 1000ms linear, margin-left 1000ms linear'
                        : 'width 200ms ease-out, height 200ms ease-out, margin-top 200ms ease-out, margin-left 200ms ease-out',
                    pointerEvents: 'none',
                },
                '& .MuiSvgIcon-root': {
                    color: isHolding ? 'plat.brandCobalt' : 'plat.textDark',
                    transition: 'color 0.3s'
                }
            }}
        >
            {icon}
        </Button>
    );
};