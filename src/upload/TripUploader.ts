import NetInfo from '@react-native-community/netinfo';
import { tripService } from '../services/tripService';
import { TripSessionData } from '../trip/TripSession';

export class TripUploader {
  static queue: TripSessionData[] = [];

  static queueUpload(trip: TripSessionData) {
    TripUploader.queue.push(trip);
    TripUploader.tryUpload();
  }

  static async tryUpload() {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.log("Offline - will upload later");
      return;
    }

    while (TripUploader.queue.length > 0) {
      const trip = TripUploader.queue.shift()!;
      try {
        console.log("Uploading trip...");
        await tripService.uploadTrip(trip);
        console.log("Upload success!");
      } catch (err) {
        console.log("Upload failed, re-queueing");
        TripUploader.queue.unshift(trip);
        return;
      }
    }
  }
}
