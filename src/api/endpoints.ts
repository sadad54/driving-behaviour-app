import { leaderboard } from "../data/mockDriverData";

export const endpoints = {
    driver:{
        profile: '/driver/profile',
        leaderboard: '/driver/leaderboard',
    },
    trip: {
        latest: '/trip/latest',
        weekly:'/trip/weekly',
        history: '/trip/history'
    },
    obd: {
        postTelemetry: '/obd/telemetry',
        postECUData: '/obd/raw',
    },
};