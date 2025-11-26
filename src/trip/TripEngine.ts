import { TelemetryManager } from '../telemetry/TelemetryManager';
import { TripSession } from './TripSession';
import {
  detectHarshBraking,
  detectRapidAcceleration,
  detectSharpTurn,
} from './eventDetection';

export class TripEngine {
  private static instance: TripEngine;
  currentTrip: TripSession | null = null;
  lastGPS: { lat: number; lon: number } | null = null;
  stationaryCount = 0;

  static getInstance() {
    if (!TripEngine.instance) {
      TripEngine.instance = new TripEngine();
    }
    return TripEngine.instance;
  }

  start() {
    setInterval(() => this.update(), 1000);  // run every second
  }

  private update() {
    const packet = TelemetryManager.getTelemetryPacket();
    const gps = packet.gps;
    const ecu = packet.ecu;
    const sensors = packet.phoneSensors;

    const ecuSpeed = ecu.speed;                 // km/h
    const gpsSpeedMps = (gps.speed || 0) * 0.277; // convert km/h → m/s

    // 🔥 Trip start condition: vehicle moving
    if (!this.currentTrip && ecuSpeed > 5) {
      this.currentTrip = new TripSession();
      console.log("Trip started");
    }

    if (!this.currentTrip) return;

    // === ACTIVE TRIP HERE ===

    // Track distance
    if (gpsSpeedMps > 0.5) {
      this.currentTrip.addDistance(gpsSpeedMps);
    }

    // Track speed
    this.currentTrip.addSpeedSample(ecu.speed);

    // Detect harsh events
    if (detectHarshBraking(sensors.accelerationX)) {
      this.currentTrip.hardBrakes++;
      console.log("Harsh Brake");
    }

    if (detectRapidAcceleration(sensors.accelerationX)) {
      this.currentTrip.rapidAccelerations++;
      console.log("Rapid Acceleration");
    }

    if (detectSharpTurn(sensors.gyroZ)) {
      this.currentTrip.sharpTurns++;
      console.log("Sharp Turn");
    }

    // Trip end detection: speed is 0 for long enough
    if (ecuSpeed < 2) {
      this.stationaryCount++;
    } else {
      this.stationaryCount = 0;
    }

    if (this.stationaryCount > 20) {  // 20 seconds still
      this.endTrip();
    }
  }

  private endTrip() {
    if (!this.currentTrip) return;

    this.currentTrip.end();
    console.log("Trip ended", this.currentTrip);
    // TODO: send trip data to backend here

    // Reset
    this.currentTrip = null;
    this.stationaryCount = 0;
  }
}
