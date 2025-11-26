// src/theme/typography.ts
import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography = {
  heading1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  } as TextStyle,
  heading2: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
  } as TextStyle,
  body: {
    fontSize: 14,
    color: colors.text,
  } as TextStyle,
  caption: {
    fontSize: 12,
    color: colors.textMuted,
  } as TextStyle,
};
