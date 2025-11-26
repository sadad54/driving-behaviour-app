import { ECUData } from "./ECUData";

export interface TelemetryPacket {
    ecu: ECUData;
    gps:{
        lat:number;
        lon: number;
        speed: number;
        accuracy: number;
    };
    phoneSensors:{
        gyroX: number;
        gyroY: number;
        gyroZ: number;
        accelerationX: number;
        accelerationY: number;
        accelerationZ: number;
    };
    timestamp: number;
    }

    //this packet is what will be sent to the backend API from the mobile app