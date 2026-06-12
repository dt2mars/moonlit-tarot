import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import type { DrawnCard } from '../types';
import { getTarotCardImageSource } from '../data/tarotCardImages';
import { getCardMeaningForDisplay, getLocalizedCardName } from '../data/cardCopy';
import type { Language, ReadingTypeId } from '../types';

const CARD_BACK_IMAGE = require('../../assets/card-back/moonlit-card-back.png');

type TarotCardProps = {
  drawnCard?: DrawnCard;
  revealed: boolean;
  hint?: string;
  uprightLabel?: string;
  reversedLabel?: string;
  language?: Language;
  readingType?: ReadingTypeId;
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
  language = 'en',
  readingType = 'loveClarity',
  compact = false,
  style,
  onPress,
}: TarotCardProps) {
  const flipProgress = useRef(new Animated.Value(revealed ? 1 : 0)).current;
  const orientationLabel = drawnCard?.orientation === 'reversed' ? reversedLabel : uprightLabel;
  const displayName = drawnCard ? getLocalizedCardName(drawnCard.card, language) : '';
  const shortMeaning = drawnCard
    ? getCardMeaningForDisplay(drawnCard, language, readingType)
    : '';
  const imageSource = drawnCard
    ? getTarotCardImageSource(drawnCard.card.id) || drawnCard.card.imageSource
    : undefined;
  const useFlipReveal = Platform.OS === 'web';

  useEffect(() => {
    Animated.timing(flipProgress, {
      toValue: revealed ? 1 : 0,
      duration: revealed ? 620 : 240,
      useNativeDriver: true,
    }).start();
  }, [flipProgress, revealed]);

  const backRotation = flipProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const frontRotation = flipProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  const nativeBackOpacity = flipProgress.interpolate({
    inputRange: [0, 0.75, 1],
    outputRange: [1, 0.25, 0],
  });
  const nativeBackScale = flipProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.96],
  });
  const nativeFrontOpacity = flipProgress.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0, 0.35, 1],
  });
  const nativeFrontScale = flipProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });
  const backRevealStyle = useFlipReveal
    ? {
        transform: [{ perspective: 1100 }, { rotateY: backRotation }],
      }
    : {
        opacity: nativeBackOpacity,
        transform: [{ scale: nativeBackScale }],
      };
  const frontRevealStyle = useFlipReveal
    ? {
        transform: [{ perspective: 1100 }, { rotateY: frontRotation }],
      }
    : {
        opacity: nativeFrontOpacity,
        transform: [{ scale: nativeFrontScale }],
      };

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        disabled={!onPress}
        onPress={onPress}
        style={({ pressed }) => [
          styles.artPanel,
          compact ? styles.compactArtPanel : null,
          pressed && onPress ? styles.pressed : null,
        ]}
      >
        <Animated.View
          pointerEvents={revealed ? 'none' : 'auto'}
          style={[
            styles.face,
            useFlipReveal ? styles.flipFace : null,
            compact ? styles.compactFace : null,
            styles.back,
            backRevealStyle,
          ]}
        >
          <View style={styles.backContent}>
            <Image
              accessibilityLabel={hint ?? 'Moonlit tarot card back'}
              resizeMode="contain"
              source={CARD_BACK_IMAGE}
              style={styles.cardBackImage}
            />
          </View>
        </Animated.View>

        {drawnCard ? (
          <Animated.View
            pointerEvents={revealed ? 'auto' : 'none'}
            style={[
              styles.face,
              useFlipReveal ? styles.flipFace : null,
              compact ? styles.compactFace : null,
              styles.front,
              frontRevealStyle,
            ]}
          >
            <View style={styles.frontContent}>
              <View style={[styles.imageFrame, compact ? styles.compactImageFrame : null]}>
                {imageSource ? (
                  <Image
                    accessibilityLabel={`${displayName} tarot card`}
                    resizeMode="contain"
                    source={imageSource}
                    style={styles.cardImage}
                  />
                ) : (
                  <View style={styles.imageFallback}>
                    <Text style={styles.fallbackMoon}>MOONLIT</Text>
                    <Text style={styles.fallbackText}>No card art mapped</Text>
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        ) : null}
      </Pressable>

      {drawnCard && revealed ? (
        <View style={[styles.explanationPanel, compact ? styles.compactExplanationPanel : null]}>
          <Text numberOfLines={compact ? 2 : 2} style={styles.name}>
            {displayName}
          </Text>
          <View style={styles.metadataRow}>
            <Text numberOfLines={1} style={styles.position}>
              {drawnCard.position}
            </Text>
            <Text style={styles.orientation}>{orientationLabel}</Text>
          </View>
          <Text numberOfLines={compact ? 2 : 3} style={styles.meaning}>
            {shortMeaning}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 12,
  },
  artPanel: {
    height: 594,
    borderRadius: 26,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 5,
  },
  compactArtPanel: {
    height: 444,
    borderRadius: 22,
  },
  face: {
    ...StyleSheet.absoluteFill,
    borderRadius: 26,
    borderWidth: 1,
    overflow: 'hidden',
  },
  flipFace: {
    backfaceVisibility: 'hidden',
  },
  compactFace: {
    borderRadius: 22,
  },
  back: {
    borderColor: 'rgba(241, 213, 138, 0.48)',
    backgroundColor: '#0B0A24',
  },
  front: {
    borderColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  backContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  cardBackImage: {
    width: '100%',
    height: '100%',
  },
  frontContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  explanationPanel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.14)',
    backgroundColor: 'rgba(7, 8, 28, 0.46)',
    padding: 16,
    gap: 9,
  },
  compactExplanationPanel: {
    padding: 14,
    gap: 8,
  },
  metadataRow: {
    minHeight: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  position: {
    flex: 1,
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  imageFrame: {
    width: '100%',
    maxWidth: 336,
    aspectRatio: 0.596,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.2)',
    backgroundColor: 'rgba(5, 8, 23, 0.42)',
    overflow: 'hidden',
    padding: 3,
  },
  compactImageFrame: {
    maxWidth: 246,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  imageFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(13, 11, 35, 0.84)',
    gap: 8,
  },
  fallbackMoon: {
    color: '#F1D58A',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  fallbackText: {
    color: 'rgba(245, 238, 255, 0.7)',
    fontSize: 12,
    fontWeight: '700',
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
