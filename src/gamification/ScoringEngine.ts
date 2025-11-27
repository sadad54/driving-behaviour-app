import { TripSessionData } from '../trip/TripSession';

export interface DriverScores {
  eco: number;
  safety: number;
  aggression: number;
  overall: number;
}

export class ScoringEngine {
  static calculateScores(trip: TripSessionData): DriverScores {
    // 🔥 ECO SCORE
    const eco = Math.max(
      0,
      100 -
        (trip.rapidAccelerations * 2.5 + trip.hardBrakes * 1.5)
    );

    // 🔥 SAFETY SCORE
    const safety = Math.max(
      0,
      100 -
        (trip.hardBrakes * 3 + trip.sharpTurns * 2)
    );

    // 🔥 AGGRESSION SCORE
    const aggression = Math.min(
      100,
      trip.rapidAccelerations * 3 +
        trip.hardBrakes * 2 +
        trip.sharpTurns * 3
    );

    // 🔥 OVERALL SCORE
    const overall = Math.max(
      0,
      Math.floor((eco * 0.4 + safety * 0.5 + (100 - aggression) * 0.1))
    );

    return { eco, safety, aggression, overall };
  }
}
