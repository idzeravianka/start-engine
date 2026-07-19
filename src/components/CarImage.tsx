"use client";

import React, {useState, useEffect} from 'react';
import {carIconService} from "@/src/utils/user-settings-store";

export default function CarImage({ carId }: { carId?: string }) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadImage() {
            const imageUrl = await carIconService.load(carId!);
            if (isMounted && imageUrl) {
                setSrc(imageUrl);
            }
        }

        if (carId) loadImage();

        return () => {
            isMounted = false;
            if (src) {
                URL.revokeObjectURL(src);
            }
        };
    }, [carId]);

    return (
        <img
            src={src ?? '/default-car.svg'}
            alt="Ваш автомобиль"
            style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                borderRadius: '12px',
                objectFit: 'contain',
            }}
        />
    );
}
