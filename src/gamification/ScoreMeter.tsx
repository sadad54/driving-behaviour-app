import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ScoreMeterProps {
  label: string;
  score: number;
}

export default function ScoreMeter({ label, score }: ScoreMeterProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: score,
      duration: 600,       // smooth duration
      useNativeDriver: false, 
    }).start();
  }, [score]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.barBackground}>
        <Animated.View style={[styles.barFill, { width: widthInterpolated }]} />
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
