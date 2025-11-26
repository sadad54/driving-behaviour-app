// src/data/mockDriverData.ts

export const driverProfile = {
  name: 'Azka',
  level: 7,
  xp: 4200,
  nextLevelXp: 5000,
  ecoScore: 86,
  safetyScore: 92,
  aggressionScore: 18,
};

export const currentTrip = {
  id: 'TRIP-2025-11-26-001',
  startTime: '08:15',
  endTime: '08:45',
  distanceKm: 18.4,
  avgSpeedKmh: 52,
  maxSpeedKmh: 96,
  hardBrakes: 1,
  sharpTurns: 2,
};

export const weeklyStats = {
  totalDistanceKm: 212.5,
  avgEcoScore: 82,
  avgSafetyScore: 88,
  tripsCount: 17,
};

export const leaderboard = [
  { rank: 1, name: 'Aisyah', score: 94 },
  { rank: 2, name: 'Azka', score: 92 },
  { rank: 3, name: 'Hafiz', score: 89 },
  { rank: 4, name: 'Zara', score: 87 },
  { rank: 5, name: 'Imran', score: 85 },
];
