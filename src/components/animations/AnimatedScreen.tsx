import React, { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import ParallaxHeader from './ParallaxHeader';

interface AnimatedScreenProps {
  children: React.ReactNode;
  title: string;
}

export default function AnimatedScreen({ children, title }: AnimatedScreenProps) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <ParallaxHeader scrollY={scrollY} title={title} />

      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 240 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
