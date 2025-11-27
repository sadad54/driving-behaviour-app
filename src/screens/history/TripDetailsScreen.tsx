import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type TripDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TripDetails'>;

type Props = {
  route: TripDetailsScreenRouteProp;
};

export default function TripDetailsScreen({ route }: Props) {
  const { trip } = route.params;


  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Trip Details</Text>

        <Text style={styles.label}>Start</Text>
        <Text style={styles.value}>{new Date(trip.startedAt).toString()}</Text>

        <Text style={styles.label}>End</Text>
        <Text style={styles.value}>{trip.endedAt ? new Date(trip.endedAt).toString() : 'N/A'}</Text>

        <Text style={styles.label}>Distance</Text>
        <Text style={styles.value}>{trip.distanceKm.toFixed(2)} km</Text>

        <Text style={styles.label}>Avg Speed</Text>
        <Text style={styles.value}>{trip.avgSpeed.toFixed(1)} km/h</Text>

        <Text style={styles.label}>Events</Text>
        <Text style={styles.value}>
          Hard Brakes: {trip.hardBrakes}{'\n'}
          Rapid Accelerations: {trip.rapidAccelerations}{'\n'}
          Sharp Turns: {trip.sharpTurns}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg },
  title: { ...typography.heading1, marginBottom: spacing.lg },
  label: { ...typography.subtitle, marginTop: spacing.md },
  value: { ...typography.body, marginTop: spacing.xs },
});
