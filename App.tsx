import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import {colors} from './src/theme/colors';
import { AppProvider } from './src/state/AppContext';
import { SensorsManager } from './src/sensors/SensorsManager';

const App = () => {
  useEffect(() => {
  SensorsManager.getInstance().initialize();
}, []);
  return (
    <AppProvider><SafeAreaProvider>
      <StatusBar style="light" backgroundColor={colors.background} />
      <RootNavigator />
    </SafeAreaProvider></AppProvider>
  );
};
export default App;