'use client';

import React, {ChangeEvent, useRef} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
    Box,
    TextField,
    Button,
} from '@mui/material';
import {ObjectSchema} from "yup";
import {ConnectionFormDT, NewConnectionFormDT} from "../types/interfaces/connection-form.interface";
import {generateId} from "@/src/utils/generate-id";
import {carIconService} from "@/src/utils/user-settings-store";

const FORM_FIELDS_CONFIG: Record<keyof NewConnectionFormDT, { label: string, placeholder: string }> = {
    name: {
        label: 'Имя автомобиля:',
        placeholder: 'Audi RS2',
    },
    server: {
        label: 'Сервер (MQTT broker):',
        placeholder: 'srv2.clusterfly.ru',
    },
    port: {
        label: 'Порт (MQTT port):',
        placeholder: '9994',
    },
    user: {
        label: 'Логин (MQTT user):',
        placeholder: 'user',
    },
    pass: {
        label: 'Пароль (MQTT password):',
        placeholder: 'qwerty',
    },
    topic: {
        label: 'Префикс топика (prefix):',
        placeholder: 'user_12345678/c5',
    },
}

interface MqttSettingsFormProps {
    initialData?: ConnectionFormDT;
    onSave: (values: ConnectionFormDT) => void | Promise<void>;
}

const validationSchema: ObjectSchema<NewConnectionFormDT> = Yup.object({
    name: Yup.string().required('Поле обязательно для заполнения'),
    server: Yup.string().required('Поле обязательно для заполнения'),
    port: Yup.string()
        .required('Поле обязательно для заполнения')
        .matches(/^\d+$/, 'Порт должен состоять только из цифр'),
    user: Yup.string().required('Поле обязательно для заполнения'),
    pass: Yup.string().required('Поле обязательно для заполнения'),
    topic: Yup.string().required('Поле обязательно для заполнения'),
});

export default function NewConnectionForm({
                                              initialData,
                                              onSave,
                                          }: MqttSettingsFormProps) {

    const formik = useFormik<NewConnectionFormDT & { carImage: File | null }>({
        initialValues: {
            name: initialData?.name || '',
            server: initialData?.server || '',
            port: initialData?.port || '',
            user: initialData?.user || '',
            pass: initialData?.pass || '',
            topic: initialData?.topic || '',
            carImage: null,
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const {carImage, ...formData} = values;
            const id = initialData?.id ?? generateId();

            if (carImage) {
                await carIconService.upload(id, carImage);
            }

            onSave({id, ...formData});
        },
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            formik.setFieldValue('carImage', file);
        }
    };

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate autoComplete="off"
             sx={{backgroundColor: 'plat.bg'}}>
            {(Object.keys(FORM_FIELDS_CONFIG) as Array<keyof NewConnectionFormDT>).map((key) => {
                const isTouched = Boolean(formik.touched[key]);
                const hasError = Boolean(formik.errors[key]);

                return (
                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                                backgroundColor: 'background.paper'
                            },
                            marginBottom: '1rem',
                        }}
                        fullWidth
                        size="small"
                        key={key}
                        id={key}
                        name={key}
                        type={key === 'pass' ? 'password' : 'text'}
                        label={FORM_FIELDS_CONFIG[key].label}
                        placeholder={FORM_FIELDS_CONFIG[key].placeholder}
                        value={formik.values[key] ?? ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={isTouched && hasError}
                        helperText={isTouched && formik.errors[key]}
                    />
                );
            })}

            <Button
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    marginBottom: '1rem',
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                Загрузить иконку авто
            </Button>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                }}
            >
                Сохранить настройки
            </Button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{display: 'none'}}
            />
        </Box>
    );
}
