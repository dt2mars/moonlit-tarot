import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
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

  const revealCard = (index: number) => {
    setRevealedCards((current) =>
      current.map((isRevealed, cardIndex) => (cardIndex === index ? true : isRevealed)),
    );
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle
          title={copy.draw.title}
          subtitle={copy.draw.subtitle}
          eyebrow={copy.readingTypes.labels[readingType]}
        />

        <View style={styles.cardList}>
          {cards.map((drawnCard, index) => (
            <TarotCard
              key={`${drawnCard.card.id}-${index}`}
              drawnCard={drawnCard}
              hint={copy.draw.revealHint}
              onPress={revealedCards[index] ? undefined : () => revealCard(index)}
              revealed={revealedCards[index]}
              reversedLabel={copy.result.reversed}
              uprightLabel={copy.result.upright}
            />
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
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 26,
    gap: 22,
  },
  cardList: {
    gap: 14,
  },
  actions: {
    gap: 12,
  },
});
