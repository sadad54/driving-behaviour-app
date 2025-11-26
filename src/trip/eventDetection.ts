export const EventThresholds = {
  braking: -3.5,          // m/s²
  acceleration: 3.5,      // m/s²
  cornering: 3.0,         // deg/s (gyro)
};

export function detectHarshBraking(accelX: number) {
  return accelX < EventThresholds.braking;
}

export function detectRapidAcceleration(accelX: number) {
  return accelX > EventThresholds.acceleration;
}

export function detectSharpTurn(gyroZ: number) {
  return Math.abs(gyroZ) > EventThresholds.cornering;
}
