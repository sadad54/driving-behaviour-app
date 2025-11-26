import * as Location from 'expo-location';
import { Accelerometer, Gyroscope } from 'expo-sensors';

export class SensorsManager {
  private static instance: SensorsManager;

  gpsData = { lat: 0, lon: 0, speed: 0, accuracy: 0 };
  gyroData = { x: 0, y: 0, z: 0 };
  accelData = { x: 0, y: 0, z: 0 };

  private constructor() {}

  static getInstance() {
    if (!SensorsManager.instance) {
      SensorsManager.instance = new SensorsManager();
    }
    return SensorsManager.instance;
  }

  // Request permissions + start sensors
  async initialize() {
    await this.startLocation();
    this.startGyro();
    this.startAccelerometer();
  }

  // GPS
  private async startLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,     // every 1 sec
        distanceInterval: 1,    // every 1m
      },
      (pos) => {
        this.gpsData = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          speed: pos.coords.speed ?? 0,
          accuracy: pos.coords.accuracy ?? 0,
        };
      }
    );
  }

  // Gyroscope
  private startGyro() {
    Gyroscope.addListener(({ x, y, z }) => {
      this.gyroData = { x, y, z };
    });
    Gyroscope.setUpdateInterval(200); // 5 updates per second
  }

  // Accelerometer
  private startAccelerometer() {
    Accelerometer.addListener(({ x, y, z }) => {
      this.accelData = { x, y, z };
    });
    Accelerometer.setUpdateInterval(200);
  }

  getTelemetrySensorData() {
    return {
      gps: this.gpsData,
      gyro: this.gyroData,
      accel: this.accelData,
    };
  }
}
