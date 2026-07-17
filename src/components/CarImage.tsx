"use client";

import React, {useState, useEffect} from 'react';
import {loadSavedImage} from "@/src/utils/user-settings-store";

export default function CarImage({ carId }: { carId: string }) {
    const [src, setSrc] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadImage() {
            try {
                const imageUrl = await loadSavedImage(carId);

                if (isMounted && imageUrl) {
                    setSrc(imageUrl);
                }
            } catch (err) {
                console.error('Ошибка загрузки картинки авто:', err);
            }
        }

        loadImage();

        return () => {
            isMounted = false;
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
