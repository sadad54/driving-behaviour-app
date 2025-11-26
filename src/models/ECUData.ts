export interface ECUData {
    rpm: number;
    throttlePosition: number;
    engineLoad: number;
    coolantTemp: number;
    speed: number;
    maf: number;
    map: number;
    intakeTemp: number;
    fuelLevel: number;
    batteryVoltage: number;

    timestamp: number;

    //can add more PIDs later
}