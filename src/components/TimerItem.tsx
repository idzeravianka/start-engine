'use client';
import SensorItem from "@/src/components/SensorItem";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import React, {useEffect, useMemo, useState} from "react";
import {TimeStatuses} from "@/src/types/enums/time-statuses";
import {MqttSensorsDataResponse} from "@/src/types/interfaces/mqtt-sensors-data-response";

export function TimerItem({ label, sensorsData }: { label?: string; sensorsData: MqttSensorsDataResponse }) {
    const [timerData, setTimerData] = useState<number>(0);

    useEffect(() => {
        const timer = sensorsData.time?.[TimeStatuses.Timer];
        if (timer !== undefined) {
            setTimerData(timer);
        }
    }, [sensorsData]);

    useEffect(() => {
        if (timerData <= 0) return;

        const timerId = setTimeout(() => {
            setTimerData((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timerData]);

    const engineCountdown = useMemo(() => {
        if (!timerData || timerData <= 0) return '--.--';
        return new Date(timerData * 1000).toISOString().substring(14, 19);
    }, [timerData]);

    return <SensorItem icon={<AvTimerIcon sx={{fontSize: '16px'}}/>} value={engineCountdown} label={label}/>
}
