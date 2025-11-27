import { TripSessionData } from '../trip/TripSession';
import { DriverScores } from './ScoringEngine';

export class XpEngine {
  static calculateXp(trip: TripSessionData, scores: DriverScores) {
    let xp = 0;

    // Distance XP
    xp += trip.distanceKm * 5; // 5 XP per km

    // Bonus for good safety score
    xp += scores.safety * 0.2;

    // Penalty for aggression score
    xp -= scores.aggression * 0.1;

    // Ensure minimum XP
    xp = Math.max(5, Math.floor(xp));

    return xp;
  }

  static getNextLevelXp(level: number) {
    return 500 + level * 150;
  }
}
