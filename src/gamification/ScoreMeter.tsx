import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ScoreMeterProps {
  label: string;
  score: number;
}

export default function ScoreMeter({ label, score }: ScoreMeterProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${score}%` }]} />
      </View>

      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  barBackground: {
    backgroundColor: "#1F2937",
    height: 10,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  score: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
