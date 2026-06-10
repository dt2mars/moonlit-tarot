import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ReadingCardProps = {
  title: string;
  subtitle?: string;
  meta?: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ReadingCard({ title, subtitle, meta, selected = false, onPress }: ReadingCardProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected ? styles.selected : null,
        pressed && onPress ? styles.pressed : null,
      ]}
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.13)', 'rgba(255, 255, 255, 0.045)']}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.accent}>
        <Text style={styles.accentText}>{meta ?? 'MT'}</Text>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>{'>'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 112,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.075)',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 4,
  },
  selected: {
    borderColor: 'rgba(241, 213, 138, 0.62)',
    backgroundColor: 'rgba(241, 213, 138, 0.13)',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  accent: {
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 7,
  },
  accentText: {
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    color: '#25163C',
    backgroundColor: '#E8D38C',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
    lineHeight: 34,
  },
  title: {
    color: '#FFF8EA',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 0,
  },
  subtitle: {
    color: 'rgba(245, 238, 255, 0.74)',
    fontSize: 14,
    lineHeight: 20,
  },
  chevron: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    color: 'rgba(241, 213, 138, 0.74)',
    fontSize: 18,
    fontWeight: '900',
  },
});
