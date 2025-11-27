// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';



// Screens
import DriversDashboardScreen from '../screens/drivers/DriversDashboardScreen';
import InsuranceDashboardScreen from '../screens/insurance/InsuranceDashboardScreen';
import ManufacturersDashboardScreen from '../screens/manufacturers/ManufacturersDashboardScreen';
import LiveTelemetryScreen from '../screens/telemetry/LiveTelemetryScreen';
import TripHistoryScreen from '../screens/history/TripHistoryScreen';
import TripDetailsScreen from '../screens/history/TripDetailsScreen';

export type RootTabParamList = {
  Drivers: undefined;
  Insurance: undefined;
  Manufacturers: undefined;
  LiveTelemetry: undefined;
  History: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.tabBar,
    text: colors.text,
    border: colors.borderSubtle,
  },
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.borderSubtle,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse';

          if (route.name === 'Drivers') iconName = 'speedometer-outline';
          if (route.name === 'Insurance') iconName = 'shield-checkmark-outline';
          if (route.name === 'Manufacturers') iconName = 'car-sport-outline';
          if (route.name === 'LiveTelemetry') iconName = 'pulse-outline';
          if (route.name === 'History') iconName = 'time-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Drivers" component={DriversDashboardScreen} />
      <Tab.Screen name="Insurance" component={InsuranceDashboardScreen} />
      <Tab.Screen name="Manufacturers" component={ManufacturersDashboardScreen} />
      <Tab.Screen name="LiveTelemetry" component={LiveTelemetryScreen} />
      <Tab.Screen name="History" component={TripHistoryScreen} />
    </Tab.Navigator>
  );
};


const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        {/* MAIN TABS */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* TRIP DETAILS SCREEN */}
        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
          options={{ headerShown: true, title: "Trip Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default RootNavigator;
