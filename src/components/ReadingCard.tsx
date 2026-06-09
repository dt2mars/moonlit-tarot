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
      <View style={styles.accent} />
      <View style={styles.content}>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 98,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    flexDirection: 'row',
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
    width: 4,
    backgroundColor: '#D7B7FF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 5,
  },
  meta: {
    color: '#D7C4FF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
    textTransform: 'uppercase',
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
});
