import { TripSessionData } from '../trip/TripSession';
import { DriverScores } from './ScoringEngine';

export class BadgesEngine {
  static getBadges(trip: TripSessionData, scores: DriverScores) {
    const badges: string[] = [];

    if (scores.safety > 90) badges.push("🏅 Safety Star");
    if (scores.eco > 90) badges.push("🌱 Eco Hero");
    if (trip.distanceKm > 50) badges.push("🚀 Long Trip Master");
    if (trip.hardBrakes === 0) badges.push("🛡 Soft Foot");
    if (trip.rapidAccelerations === 0) badges.push("✨ Smooth Driver");

    return badges;
  }
}
