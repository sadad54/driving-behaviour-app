import {api} from '../api/axiosInstance';
import {endpoints} from '../api/endpoints';
import {TelemetryPacket} from '../models/TelemetryPacket';

export const obdService ={
    async sendTelemetry(packet: TelemetryPacket){
        const response = await api.post(endpoints.obd.postTelemetry, packet);
        return response.data;
    },
};