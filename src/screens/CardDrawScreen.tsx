import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { SectionTitle } from '../components/SectionTitle';
import { TarotCard } from '../components/TarotCard';
import { STRINGS } from '../data/localization';
import { drawCards } from '../utils/cardDraw';
import type { DrawnCard, Language, ReadingTypeId, SpreadSize } from '../types';

type CardDrawScreenProps = {
  language: Language;
  readingType: ReadingTypeId;
  spreadSize: SpreadSize;
  onComplete: (cards: DrawnCard[]) => void;
  onBack: () => void;
};

export function CardDrawScreen({
  language,
  readingType,
  spreadSize,
  onComplete,
  onBack,
}: CardDrawScreenProps) {
  const copy = STRINGS[language];
  const [cards] = useState<DrawnCard[]>(() => drawCards(spreadSize));
  const [revealedCards, setRevealedCards] = useState<boolean[]>(() =>
    Array.from({ length: spreadSize }, () => false),
  );

  const allRevealed = revealedCards.every(Boolean);
  const revealedCount = revealedCards.filter(Boolean).length;

  const revealCard = (index: number) => {
    setRevealedCards((current) =>
      current.map((isRevealed, cardIndex) => (cardIndex === index ? true : isRevealed)),
    );
  };

  return (
    <GradientBackground>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          title={copy.draw.title}
          subtitle={copy.draw.subtitle}
          eyebrow={copy.readingTypes.labels[readingType]}
        />

        <View style={styles.progressPanel}>
          <Text style={styles.progressText}>
            {revealedCount} / {cards.length}
          </Text>
          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${(revealedCount / cards.length) * 100}%` }]}
            />
          </View>
        </View>

        <View style={styles.cardList}>
          {cards.map((drawnCard, index) => (
            <View key={`${drawnCard.card.id}-${index}`} style={styles.cardShell}>
              <TarotCard
                drawnCard={drawnCard}
                hint={copy.draw.revealHint}
                onPress={revealedCards[index] ? undefined : () => revealCard(index)}
                revealed={revealedCards[index]}
                reversedLabel={copy.result.reversed}
                uprightLabel={copy.result.upright}
              />
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            disabled={!allRevealed}
            title={copy.draw.continue}
            onPress={() => onComplete(cards)}
          />
          <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
        </View>
      </ScreenScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
  },
  progressPanel: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 14,
    gap: 10,
  },
  progressText: {
    color: '#F1D58A',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  progressTrack: {
    height: 5,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  progressFill: {
    height: 5,
    borderRadius: 999,
    backgroundColor: '#F1D58A',
  },
  cardList: {
    gap: 16,
  },
  cardShell: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  actions: {
    gap: 12,
  },
});
