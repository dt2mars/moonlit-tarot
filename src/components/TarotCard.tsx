import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import type { DrawnCard } from '../types';

type TarotCardProps = {
  drawnCard?: DrawnCard;
  revealed: boolean;
  hint?: string;
  uprightLabel?: string;
  reversedLabel?: string;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export function TarotCard({
  drawnCard,
  revealed,
  hint,
  uprightLabel = 'Upright',
  reversedLabel = 'Reversed',
  compact = false,
  style,
  onPress,
}: TarotCardProps) {
  const orientationLabel =
    drawnCard?.orientation === 'reversed' ? reversedLabel : uprightLabel;

  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        compact ? styles.compact : null,
        !revealed ? styles.back : styles.front,
        pressed && onPress ? styles.pressed : null,
        style,
      ]}
    >
      {!revealed || !drawnCard ? (
        <View style={styles.backContent}>
          <View style={styles.backRing}>
            <View style={styles.backMoon} />
          </View>
          <Text style={styles.backTitle}>MOONLIT</Text>
          {hint ? <Text style={styles.hint}>{hint}</Text> : null}
        </View>
      ) : (
        <View style={styles.frontContent}>
          <Text numberOfLines={1} style={styles.position}>
            {drawnCard.position}
          </Text>
          <Text numberOfLines={compact ? 2 : 3} style={styles.name}>
            {drawnCard.card.name}
          </Text>
          <Text style={styles.orientation}>{orientationLabel}</Text>
          <Text numberOfLines={compact ? 3 : 5} style={styles.meaning}>
            {drawnCard.card.loveMeaning}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 246,
    borderRadius: 26,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 5,
  },
  compact: {
    minHeight: 196,
    borderRadius: 22,
  },
  back: {
    borderColor: 'rgba(241, 213, 138, 0.38)',
    backgroundColor: 'rgba(13, 11, 35, 0.92)',
  },
  front: {
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  backContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 14,
  },
  backRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backMoon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(241, 213, 138, 0.78)',
    shadowColor: '#F1D58A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  backTitle: {
    color: '#F8E6B1',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  hint: {
    color: 'rgba(245, 238, 255, 0.64)',
    fontSize: 13,
  },
  frontContent: {
    flex: 1,
    padding: 18,
    justifyContent: 'space-between',
    gap: 8,
  },
  position: {
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  name: {
    color: '#FFF8EA',
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: 0,
  },
  orientation: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#22163A',
    backgroundColor: '#F1D58A',
    fontSize: 12,
    fontWeight: '800',
  },
  meaning: {
    color: 'rgba(245, 238, 255, 0.78)',
    fontSize: 13,
    lineHeight: 19,
  },
});
