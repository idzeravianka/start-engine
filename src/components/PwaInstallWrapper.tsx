'use client';

import {useEffect, useState} from "react";

export function PwaInstallWrapper() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        import('@khmyznikov/pwa-install').then(() => {
            setMounted(true);
        });
    }, []);

    if (!mounted) return null;

    return (
        <pwa-install
            id="pwa-install"
            manifest-url="manifest.json"
        />
    )
}