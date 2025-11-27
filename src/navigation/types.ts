import { TripSessionData } from '../trip/TripSession';

export type RootStackParamList = {
  MainTabs: undefined;
  TripDetails: { trip: TripSessionData };
};
