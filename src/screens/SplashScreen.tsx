import { Image, StyleSheet, View } from 'react-native';

const SPLASH_IMAGE = require('../../assets/splash/splash.png');

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="cover"
        source={SPLASH_IMAGE}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07081C',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
