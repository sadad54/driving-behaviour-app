// src/screens/insurance/InsuranceDashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const InsuranceDashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={typography.heading1}>Insurance</Text>
        <Text style={[typography.subtitle, { marginTop: spacing.sm }]}>
          This dashboard will show portfolio risk, driver segments, and claims
          insights once we integrate the backend.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
});

export default InsuranceDashboardScreen;
