// src/screens/drivers/DriversDashboardScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/common/Card';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import {
  driverProfile,
  currentTrip,
  weeklyStats,
  leaderboard,
} from '../../data/mockDriverData';
import { TelemetryManager } from '../../telemetry/TelemetryManager';

const { width } = Dimensions.get('window');

const DriversDashboardScreen: React.FC = () => {
  const xpProgress =
    (driverProfile.xp / driverProfile.nextLevelXp) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* “Hero” section */}
        <View style={styles.hero}>
          <Text style={styles.appTitle}>DriveSense</Text>
          <Text style={styles.heroSubtitle}>Driving behaviour insights</Text>

          <Card style={styles.levelCard}>
            <Text style={styles.levelText}>
              Level {driverProfile.level}
            </Text>
            <Text style={styles.playerName}>{driverProfile.name}</Text>
            <Text style={styles.xpText}>
              XP {driverProfile.xp} / {driverProfile.nextLevelXp}
            </Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${xpProgress}%` },
                ]}
              />
            </View>
            <Text style={styles.badgeText}>Eco Driver • Tier Gold</Text>
          </Card>
        </View>

        {/* Key scores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scores overview</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            <Card style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>Eco Score</Text>
              <Text style={styles.scoreValue}>
                {driverProfile.ecoScore}
              </Text>
              <Text style={styles.scoreHint}>
                Smooth accelerations & braking
              </Text>
            </Card>

            <Card style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>Safety Score</Text>
              <Text style={styles.scoreValue}>
                {driverProfile.safetyScore}
              </Text>
              <Text style={styles.scoreHint}>
                Distance keeping & speed limits
              </Text>
            </Card>

            <Card style={styles.scoreCard}>
              <Text style={styles.scoreLabel}>Aggression</Text>
              <Text style={[styles.scoreValue, styles.aggressionValue]}>
                {driverProfile.aggressionScore}
              </Text>
              <Text style={styles.scoreHint}>
                Lower is better – keep it calm
              </Text>
            </Card>
          </ScrollView>
        </View>

        {/* Current trip snapshot */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current trip</Text>
          <Card>
            <Text style={styles.tripId}>{currentTrip.id}</Text>
            <Text style={styles.tripTime}>
              {currentTrip.startTime} → {currentTrip.endTime}
            </Text>
            <View style={styles.tripRow}>
              <StatChip label="Distance" value={`${currentTrip.distanceKm} km`} />
              <StatChip label="Avg Speed" value={`${currentTrip.avgSpeedKmh} km/h`} />
              <StatChip label="Max Speed" value={`${currentTrip.maxSpeedKmh} km/h`} />
            </View>
            <View style={styles.tripRow}>
              <StatChip label="Hard brakes" value={`${currentTrip.hardBrakes}`} />
              <StatChip label="Sharp turns" value={`${currentTrip.sharpTurns}`} />
            </View>
            <Text style={styles.tripHint}>
              In the future: this card will show live ECU + GPS data.
            </Text>
          </Card>
        </View>

        {/* Weekly summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This week</Text>
          <Card>
            <View style={styles.weekRow}>
              <View>
                <Text style={styles.weekLabel}>Total distance</Text>
                <Text style={styles.weekValue}>
                  {weeklyStats.totalDistanceKm.toFixed(1)} km
                </Text>
              </View>
              <View>
                <Text style={styles.weekLabel}>Trips</Text>
                <Text style={styles.weekValue}>
                  {weeklyStats.tripsCount}
                </Text>
              </View>
            </View>
            <View style={styles.weekRow}>
              <View>
                <Text style={styles.weekLabel}>Avg eco</Text>
                <Text style={styles.weekValue}>
                  {weeklyStats.avgEcoScore}
                </Text>
              </View>
              <View>
                <Text style={styles.weekLabel}>Avg safety</Text>
                <Text style={styles.weekValue}>
                  {weeklyStats.avgSafetyScore}
                </Text>
              </View>
            </View>
            <Text style={styles.weekHint}>
              Later we can add trend charts, streaks and badges here.
            </Text>
          </Card>
        </View>

        {/* Leaderboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <Card>
            {leaderboard.map((entry) => (
              <View
                key={entry.rank}
                style={[
                  styles.leaderRow,
                  entry.name === driverProfile.name && styles.leaderRowHighlight,
                ]}
              >
                <Text style={styles.leaderRank}>#{entry.rank}</Text>
                <Text style={styles.leaderName}>{entry.name}</Text>
                <Text style={styles.leaderScore}>{entry.score}</Text>
              </View>
            ))}
            <Text style={styles.leaderHint}>
              Gamified: scores are calculated on the backend using ECU + sensor data.
            </Text>
          </Card>

        </View>
        {/*dummy button */}
        <Button
  title="Print Telemetry Packet"
  onPress={() => {
    const packet = TelemetryManager.getTelemetryPacket();
    console.log(JSON.stringify(packet, null, 2));
  }}
/>

        {/* Spacer */}
        <View style={{ height: spacing.xxl }} />


      </ScrollView>
    </SafeAreaView>
  );
};

interface StatChipProps {
  label: string;
  value: string;
}

const StatChip: React.FC<StatChipProps> = ({ label, value }) => {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  appTitle: {
    ...typography.heading1,
  },
  heroSubtitle: {
    ...typography.subtitle,
    marginTop: spacing.sm,
  },
  levelCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.primarySoft,
  },
  levelText: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  playerName: {
    ...typography.heading2,
    marginTop: spacing.sm,
  },
  xpText: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  progressBarBackground: {
    marginTop: spacing.sm,
    height: 8,
    width: '100%',
    borderRadius: 999,
    backgroundColor: '#1F2937',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  badgeText: {
    ...typography.caption,
    marginTop: spacing.sm,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading2,
    marginBottom: spacing.sm,
  },
  horizontalList: {
    paddingRight: spacing.lg,
  },
  scoreCard: {
    width: width * 0.6,
    marginRight: spacing.md,
  },
  scoreLabel: {
    ...typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  scoreValue: {
    ...typography.heading1,
    marginTop: spacing.sm,
  },
  aggressionValue: {
    color: colors.danger,
  },
  scoreHint: {
    ...typography.caption,
    marginTop: spacing.sm,
  },
  tripId: {
    ...typography.caption,
  },
  tripTime: {
    ...typography.body,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  tripRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    backgroundColor: '#0F172A',
    marginRight: spacing.sm,
  },
  chipLabel: {
    ...typography.caption,
  },
  chipValue: {
    ...typography.body,
    marginTop: 2,
  },
  tripHint: {
    ...typography.caption,
    marginTop: spacing.md,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  weekLabel: {
    ...typography.caption,
  },
  weekValue: {
    ...typography.heading2,
    marginTop: 2,
  },
  weekHint: {
    ...typography.caption,
    marginTop: spacing.md,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  leaderRowHighlight: {
    backgroundColor: '#22C55E10',
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
  },
  leaderRank: {
    ...typography.body,
    width: 40,
  },
  leaderName: {
    ...typography.body,
    flex: 1,
  },
  leaderScore: {
    ...typography.body,
    fontWeight: '700',
  },
  leaderHint: {
    ...typography.caption,
    marginTop: spacing.md,
  },
});

export default DriversDashboardScreen;
