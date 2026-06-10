import type { ReactNode } from 'react';
import { Platform, SafeAreaView, StatusBar as RNStatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientBackgroundProps = {
  children: ReactNode;
};

const STARS = [
  { top: '8%', left: '12%', size: 2, opacity: 0.55 },
  { top: '13%', left: '78%', size: 3, opacity: 0.8 },
  { top: '22%', left: '58%', size: 2, opacity: 0.5 },
  { top: '34%', left: '88%', size: 2, opacity: 0.55 },
  { top: '44%', left: '9%', size: 3, opacity: 0.65 },
  { top: '63%', left: '83%', size: 2, opacity: 0.45 },
  { top: '76%', left: '18%', size: 2, opacity: 0.5 },
  { top: '86%', left: '66%', size: 3, opacity: 0.38 },
  { top: '18%', left: '28%', size: 1, opacity: 0.52 },
  { top: '52%', left: '71%', size: 1, opacity: 0.48 },
] as const;

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <LinearGradient colors={['#050817', '#11102C', '#2D1648']} style={styles.root}>
      <View pointerEvents="none" style={styles.topVignette} />
      <View pointerEvents="none" style={styles.moonGlow} />
      <View pointerEvents="none" style={styles.moonCore} />
      <View pointerEvents="none" style={styles.sideGlow} />
      <View pointerEvents="none" style={styles.bottomGlow} />
      {STARS.map((star, index) => (
        <View
          key={`${star.top}-${index}`}
          pointerEvents="none"
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
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#070B1F',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 24 : 0,
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
    elevation: 8,
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
