export interface LeaderboardEntry {
  name: string;
  score: number;
}

export class LeaderboardEngine {
  static getMockLeaderboard(): LeaderboardEntry[] {
    return [
      { name: "Aisyah", score: 94 },
      { name: "Adnan", score: 92 },
      { name: "Hafiz", score: 89 },
      { name: "Zara", score: 87 },
      { name: "Imran", score: 85 },
    ];
  }
}
