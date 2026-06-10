import type { ReactNode } from 'react';
import { Platform, SafeAreaView, StatusBar as RNStatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientBackgroundProps = {
  children: ReactNode;
};

const STARS = [
  { top: '7%', left: '10%', size: 1, opacity: 0.18 },
  { top: '14%', left: '82%', size: 2, opacity: 0.22 },
  { top: '25%', left: '92%', size: 1, opacity: 0.16 },
  { top: '39%', left: '7%', size: 2, opacity: 0.16 },
  { top: '58%', left: '90%', size: 1, opacity: 0.14 },
  { top: '76%', left: '14%', size: 1, opacity: 0.16 },
  { top: '88%', left: '74%', size: 2, opacity: 0.13 },
  { top: '18%', left: '30%', size: 1, opacity: 0.12 },
] as const;

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <LinearGradient colors={['#050817', '#11102C', '#2D1648']} style={styles.root}>
      <View pointerEvents="none" style={styles.decorLayer}>
        <View style={styles.topVignette} />
        <View style={styles.moonGlow} />
        <View style={styles.moonCore} />
        <View style={styles.sideGlow} />
        <View style={styles.bottomGlow} />
        {STARS.map((star, index) => (
          <View
            key={`${star.top}-${index}`}
            style={[
              styles.star,
              {
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              },
            ]}
          />
        ))}
      </View>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#070B1F',
    overflow: 'hidden',
  },
  decorLayer: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 24 : 0,
    zIndex: 2,
    elevation: 2,
  },
  moonGlow: {
    position: 'absolute',
    top: -92,
    right: -68,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(234, 224, 255, 0.18)',
  },
  moonCore: {
    position: 'absolute',
    top: 30,
    right: 34,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(245, 239, 220, 0.72)',
    shadowColor: '#F5EFDC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 28,
    elevation: 0,
  },
  topVignette: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.025)',
  },
  sideGlow: {
    position: 'absolute',
    top: 190,
    left: -120,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(83, 112, 255, 0.1)',
  },
  bottomGlow: {
    position: 'absolute',
    left: -80,
    right: -80,
    bottom: -140,
    height: 300,
    borderRadius: 160,
    backgroundColor: 'rgba(170, 104, 210, 0.2)',
  },
  star: {
    position: 'absolute',
    borderRadius: 2,
    backgroundColor: '#F4EFD8',
  },
});
