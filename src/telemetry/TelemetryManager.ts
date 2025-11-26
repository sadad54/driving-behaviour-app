import { TelemetryPacket } from '../models/TelemetryPacket';
import { SensorsManager } from '../sensors/SensorsManager';
import { OBDMock } from '../obd/OBDMock';

export class TelemetryManager {
  static getTelemetryPacket(): TelemetryPacket {
    const sensors = SensorsManager.getInstance().getTelemetrySensorData();
    const ecu = OBDMock.generateECUData(); // replace later with real BLE

    return {
      ecu,
      gps: sensors.gps,
      phoneSensors: {
        gyroX: sensors.gyro.x,
        gyroY: sensors.gyro.y,
        gyroZ: sensors.gyro.z,
        accelerationX: sensors.accel.x,
        accelerationY: sensors.accel.y,
        accelerationZ: sensors.accel.z,
      },
      timestamp: Date.now(),
    };
  }
}
