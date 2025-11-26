export interface TripSnapshot {
    id: string;
    startTime: string;
    endTime: string;
    distanceKm: number;
    avgSpeedKmh: number;
    maxSpeedKmh: number;
    hardBrakes: number;
    sharpTurns: number;
}

export interface WeeklyStats {
    totalDistanceKm: number;
    avgEcoScore: number;
    avgSafetyScore: number;
    tripsCount: number;
}