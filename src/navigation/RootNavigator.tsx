// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Screens
import DriversDashboardScreen from '../screens/drivers/DriversDashboardScreen';
import InsuranceDashboardScreen from '../screens/insurance/InsuranceDashboardScreen';
import ManufacturersDashboardScreen from '../screens/manufacturers/ManufacturersDashboardScreen';


export type RootTabParamList = {
  Drivers: undefined;
  Insurance: undefined;
  Manufacturers: undefined;
};

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

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navTheme}>
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

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Drivers" component={DriversDashboardScreen} />
        <Tab.Screen name="Insurance" component={InsuranceDashboardScreen} />
        <Tab.Screen name="Manufacturers" component={ManufacturersDashboardScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
