import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { Challenge } from './ChallengesEngine';
export default function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{challenge.title}</Text>
      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {challenge.progress}/{challenge.goal}
        </Text>
      </View>
      <Text style={styles.reward}>Reward: +{challenge.rewardXp} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: 16,
    borderColor: colors.borderSubtle,
    borderWidth: 1,
  },
  title: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  progress: {
    marginBottom: spacing.sm,
  },
  progressText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  reward: {
    ...typography.caption,
    color: colors.primary,
  },
});
