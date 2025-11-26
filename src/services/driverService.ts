import {api} from '../api/axiosInstance';
import {endpoints} from '../api/endpoints';
import {DriverProfile} from '../models/Driver';

export const driverService = {
    async getProfile(): Promise<DriverProfile>{
        const response = await api.get<DriverProfile>(endpoints.driver.profile);
        return response.data;
    },
    async getLeaderboard(): Promise<DriverProfile[]>{
        const response = await api.get<DriverProfile[]>(endpoints.driver.leaderboard);
        return response.data;
    }
}