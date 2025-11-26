export interface TripSessionData {
  startedAt: number;
  endedAt?: number;
  distanceKm: number;
  avgSpeed: number;
  hardBrakes: number;
  rapidAccelerations: number;
  sharpTurns: number;
}

export class TripSession {
  startedAt: number;
  endedAt?: number;

  distanceKm = 0;
  avgSpeed = 0;
  hardBrakes = 0;
  rapidAccelerations = 0;
  sharpTurns = 0;

  speedSamples: number[] = [];

  constructor() {
    this.startedAt = Date.now();
  }

  addDistance(deltaMeters: number) {
    this.distanceKm += deltaMeters / 1000;
  }

  addSpeedSample(speed: number) {
    this.speedSamples.push(speed);
    this.avgSpeed =
      this.speedSamples.reduce((a, b) => a + b, 0) /
      this.speedSamples.length;
  }

  end() {
    this.endedAt = Date.now();
  }
}
