import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { TripStorage } from '../../storage/TripStorage';
import { TripSessionData } from '../../trip/TripSession';
import Card from '../../components/common/Card';
import { useNavigation } from '@react-navigation/native';
import TripDetailsScreen from './TripDetailsScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
type NavProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

const TripHistoryScreen = () => {
  const [trips, setTrips] = useState<TripSessionData[]>([]);
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    const data = await TripStorage.getAllTrips();
    setTrips(data);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trip History</Text>

        {trips.length === 0 && (
          <Text style={styles.noTrips}>No trips recorded yet.</Text>
        )}

        {trips.map((t, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('TripDetails', { trip: t })}
          >
            <Card style={styles.card}>
              <Text style={styles.time}>
                {new Date(t.startedAt).toLocaleString()}
              </Text>
              <Text style={styles.distance}>
                Distance: {t.distanceKm.toFixed(2)} km
              </Text>
              <Text style={styles.events}>
                🚗 Avg Speed: {t.avgSpeed.toFixed(1)} km/h
              </Text>
              <Text style={styles.events}>
                ⚠️ Hard Brakes: {t.hardBrakes} | Turns: {t.sharpTurns} | Accels: {t.rapidAccelerations}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    padding: spacing.lg,
  },
  title: {
    ...typography.heading1,
    marginBottom: spacing.lg,
  },
  noTrips: {
    ...typography.subtitle,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  card: {
    marginBottom: spacing.md,
  },
  time: { ...typography.body, marginBottom: spacing.xs },
  distance: { ...typography.heading2 },
  events: { ...typography.caption, marginTop: spacing.sm },
});

export default TripHistoryScreen;
