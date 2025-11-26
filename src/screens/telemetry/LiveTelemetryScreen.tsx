import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Card from '../../components/common/Card';

import { TelemetryManager } from '../../telemetry/TelemetryManager';
import { TelemetryPacket } from '../../models/TelemetryPacket';

const REFRESH_RATE_MS = 600; // every 0.6 seconds

const LiveTelemetryScreen: React.FC = () => {
  const [packet, setPacket] = useState<TelemetryPacket | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket = TelemetryManager.getTelemetryPacket();
      setPacket(newPacket);
    }, REFRESH_RATE_MS);

    return () => clearInterval(interval);
  }, []);

  if (!packet) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loading}>Loading telemetry…</Text>
      </SafeAreaView>
    );
  }

  const { ecu, gps, phoneSensors } = packet;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Live Telemetry</Text>

        {/* SPEED */}
        <Card style={styles.largeCard}>
          <Text style={styles.label}>Speed (ECU)</Text>
          <Text style={styles.speed}>{ecu.speed} km/h</Text>

          <Text style={styles.labelSmall}>GPS Speed</Text>
          <Text style={styles.gpsSpeed}>{Math.floor(gps.speed || 0)} km/h</Text>
        </Card>

        {/* RPM */}
        <Card style={styles.largeCard}>
          <Text style={styles.label}>RPM</Text>
          <Text style={styles.rpm}>{ecu.rpm}</Text>
        </Card>

        {/* THREE SMALLER CARDS IN A ROW */}
        <View style={styles.row}>
          <Card style={styles.smallCard}>
            <Text style={styles.labelSmall}>Throttle</Text>
            <Text style={styles.value}>{ecu.throttlePosition.toFixed(0)}%</Text>
          </Card>

          <Card style={styles.smallCard}>
            <Text style={styles.labelSmall}>Battery</Text>
            <Text style={styles.value}>{ecu.batteryVoltage.toFixed(1)} V</Text>
          </Card>

          <Card style={styles.smallCard}>
            <Text style={styles.labelSmall}>Coolant</Text>
            <Text style={styles.value}>{ecu.coolantTemp.toFixed(1)}°C</Text>
          </Card>
        </View>

        {/* SENSORS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone Sensors</Text>
        </View>

        <Card>
          <Text style={styles.labelSmall}>Gyroscope</Text>
          <Text style={styles.valueSmall}>
            x: {phoneSensors.gyroX.toFixed(2)} | y: {phoneSensors.gyroY.toFixed(2)} | z:{' '}
            {phoneSensors.gyroZ.toFixed(2)}
          </Text>

          <Text style={[styles.labelSmall, { marginTop: spacing.sm }]}>Accelerometer</Text>
          <Text style={styles.valueSmall}>
            x: {phoneSensors.accelerationX.toFixed(2)} | y:{' '}
            {phoneSensors.accelerationY.toFixed(2)} | z:{' '}
            {phoneSensors.accelerationZ.toFixed(2)}
          </Text>
        </Card>

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  loading: {
    ...typography.heading2,
    textAlign: 'center',
    marginTop: 50,
    color: colors.textMuted,
  },
  title: {
    ...typography.heading1,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  label: {
    ...typography.subtitle,
    color: colors.textMuted,
  },
  labelSmall: {
    ...typography.caption,
    color: colors.textMuted,
  },
  valueSmall: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  speed: {
    ...typography.heading1,
    fontSize: 48,
    color: colors.primary,
    marginVertical: spacing.sm,
  },
  gpsSpeed: {
    ...typography.heading2,
    marginTop: spacing.xs,
    color: colors.secondary,
  },
  rpm: {
    ...typography.heading1,
    fontSize: 42,
    color: colors.secondary,
    marginTop: spacing.sm,
  },
  smallCard: {
    width: '32%',
  },
  largeCard: {
    marginBottom: spacing.md,
  },
  value: {
    ...typography.heading2,
    marginTop: spacing.sm,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.heading2,
  },
});

export default LiveTelemetryScreen;
