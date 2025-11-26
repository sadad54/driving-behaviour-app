import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import {colors} from './src/theme/colors';
import { AppProvider } from './src/state/AppContext';
import { SensorsManager } from './src/sensors/SensorsManager';
import { TripEngine } from './src/trip/TripEngine';
  
const App = () => {
  useEffect(() => {
  SensorsManager.getInstance().initialize();
  TripEngine.getInstance().start();
}, []);
  return (
    <AppProvider><SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.background} />
      <RootNavigator />
    </SafeAreaProvider></AppProvider>
  );
};
export default App;