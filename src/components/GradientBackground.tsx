import type { ReactNode } from 'react';
import { Image, Platform, SafeAreaView, StatusBar as RNStatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GradientBackgroundProps = {
  children: ReactNode;
};

const APP_BACKGROUND_IMAGE = require('../../assets/backgrounds/app-background.png');
const BACKGROUND_ASPECT_RATIO = 864 / 1536;

export function GradientBackground({ children }: GradientBackgroundProps) {
  const { height, width } = useWindowDimensions();
  const screenAspectRatio = width / Math.max(height, 1);
  const imageWidth =
    screenAspectRatio > BACKGROUND_ASPECT_RATIO ? width : height * BACKGROUND_ASPECT_RATIO;
  const imageHeight =
    screenAspectRatio > BACKGROUND_ASPECT_RATIO ? width / BACKGROUND_ASPECT_RATIO : height;

  return (
    <View style={styles.root}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="cover"
        source={APP_BACKGROUND_IMAGE}
        style={[
          styles.backgroundImage,
          {
            height: imageHeight,
            left: (width - imageWidth) / 2,
            width: imageWidth,
          },
        ]}
      />
      <LinearGradient
        colors={['rgba(5, 8, 23, 0.28)', 'rgba(7, 8, 28, 0.56)', 'rgba(7, 8, 28, 0.78)']}
        locations={[0, 0.48, 1]}
        pointerEvents="none"
        style={styles.overlay}
      />
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#07081C',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight ?? 24 : 0,
    zIndex: 2,
    elevation: 2,
  },
});
