import { api } from "../api/axiosInstance";
import { endpoints } from "../api/endpoints";
import { TripSnapshot, WeeklyStats } from "../models/Trip";
import { TripSessionData } from "../trip/TripSession";

export const tripService = {
    async getLatestTrip(): Promise<TripSnapshot> {
        const response = await api.get<TripSnapshot>(endpoints.trip.latest);
        return response.data;
    },

    async getWeeklyStats(): Promise<WeeklyStats> {
        const response = await api.get<WeeklyStats>(endpoints.trip.weekly);
        return response.data;
    },
     async getHistory() {
    const response = await api.get(endpoints.trip.history);
    return response.data;
  },

  async uploadTrip(tripData: TripSessionData) {
  const response = await api.post('/trip/upload', tripData);
  return response.data;
}

};