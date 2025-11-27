import AsyncStorage from '@react-native-async-storage/async-storage';
import { TripSessionData } from '../trip/TripSession';

const KEY = 'trip_history';

export const TripStorage = {
  async saveTrip(trip: TripSessionData) {
    const existing = await TripStorage.getAllTrips();
    const updated = [trip, ...existing];
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  },

  async getAllTrips(): Promise<TripSessionData[]> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  },

  async clear() {
    await AsyncStorage.removeItem(KEY);
  }
};
