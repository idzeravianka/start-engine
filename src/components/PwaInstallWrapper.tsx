'use client';

import {RefObject, useEffect, useRef, useState} from "react";
import {PWAInstallElement} from "@khmyznikov/pwa-install";

export function PwaInstallWrapper() {
    const [mounted, setMounted] = useState(false);
    const pwaInstallElementRef: RefObject<PWAInstallElement | null> = useRef(null);
    useEffect(() => {
        import('@khmyznikov/pwa-install').then(() => {
            setMounted(true);
        });
    }, []);

    useEffect(() => {
        if (mounted) {
            setTimeout(() => {
                pwaInstallElementRef.current?.showDialog(true);
            }, 1500);
        }
    }, [mounted]);

    if (!mounted) return null;

    return (
        <pwa-install
            id="pwa-install"
            manifest-url="manifest.json"
            ref={pwaInstallElementRef}
        />
    )
}