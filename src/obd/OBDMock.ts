import { ECUData } from '../models/ECUData';

export class OBDMock {
  static generateECUData(): ECUData {
    return {
      rpm: Math.floor(600 + Math.random() * 4000),
      throttlePosition: Math.random() * 100,
      engineLoad: Math.random() * 100,
      coolantTemp: 70 + Math.random() * 20,
      speed: Math.floor(Math.random() * 120),
      maf: Math.random() * 40,
      map: Math.random() * 20,
      intakeTemp: 20 + Math.random() * 15,
      fuelLevel: Math.random() * 100,
      batteryVoltage: 11 + Math.random() * 2,
      timestamp: Date.now(),
    };
  }
}
//later this file will be replaced by OBDBluetoothManager.ts