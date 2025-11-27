export interface Challenge {
  id: string;
  title: string;
  goal: number;
  progress: number;
  rewardXp: number;
}

export class ChallengesEngine {
  static getWeeklyChallenges(): Challenge[] {
    return [
      {
        id: "eco_50km",
        title: "Drive 50km with Eco Score > 80",
        goal: 50,
        progress: 0,
        rewardXp: 300,
      },
      {
        id: "no_hard_brake",
        title: "Complete 3 trips with 0 hard brakes",
        goal: 3,
        progress: 0,
        rewardXp: 250,
      },
    ];
  }
}
