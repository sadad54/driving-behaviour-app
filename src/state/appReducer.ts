export const initialState = {
  driver: null,
  latestTrip: null,
  weeklyStats: null,
  leaderboard: [],
};

export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_DRIVER':
      return { ...state, driver: action.payload };
    case 'SET_LATEST_TRIP':
      return { ...state, latestTrip: action.payload };
    case 'SET_WEEKLY_STATS':
      return { ...state, weeklyStats: action.payload };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    default:
      return state;
  }
};
