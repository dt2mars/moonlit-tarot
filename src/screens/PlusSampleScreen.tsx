import { StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { SectionTitle } from '../components/SectionTitle';
import { TarotCard } from '../components/TarotCard';
import { STRINGS } from '../data/localization';
import { MAJOR_ARCANA } from '../data/tarotCards';
import type { DrawnCard, Language, TarotCardData } from '../types';

type PlusSampleScreenProps = {
  language: Language;
  onBack: () => void;
};

export function PlusSampleScreen({ language, onBack }: PlusSampleScreenProps) {
  const copy = STRINGS[language];
  const sampleCards = getSampleCards(copy.plusSample.positions);

  return (
    <GradientBackground>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          eyebrow="Moonlit Plus"
          subtitle={copy.plusSample.subtitle}
          title={copy.plusSample.title}
        />

        <View style={styles.notePanel}>
          <Text style={styles.noteBadge}>{copy.plus.badge}</Text>
          <Text style={styles.noteText}>{copy.plusSample.note}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{copy.plusSample.cardsLabel}</Text>
          <View style={styles.cards}>
            {sampleCards.map((drawnCard) => (
              <TarotCard
                key={drawnCard.card.id}
                compact
                drawnCard={drawnCard}
                language={language}
                readingType="dailyFortune"
                revealed
                reversedLabel={copy.result.reversed}
                uprightLabel={copy.result.upright}
              />
            ))}
          </View>
        </View>

        <View style={styles.interpretationPanel}>
          <Text style={styles.panelLabel}>{copy.plusSample.interpretationTitle}</Text>
          <Text style={styles.bodyText}>{copy.plusSample.interpretation}</Text>
        </View>

        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
      </ScreenScrollView>
    </GradientBackground>
  );
}

function getSampleCards(positions: {
  current: string;
  hidden: string;
  next: string;
}): DrawnCard[] {
  return [
    {
      card: getCardById('high-priestess'),
      orientation: 'upright',
      position: positions.current,
    },
    {
      card: getCardById('moon'),
      orientation: 'upright',
      position: positions.hidden,
    },
    {
      card: getCardById('star'),
      orientation: 'upright',
      position: positions.next,
    },
  ];
}

function getCardById(cardId: string): TarotCardData {
  return MAJOR_ARCANA.find((card) => card.id === cardId) ?? MAJOR_ARCANA[0];
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
  },
  notePanel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.18)',
    backgroundColor: 'rgba(241, 213, 138, 0.08)',
    padding: 18,
    gap: 10,
  },
  noteBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#25163C',
    backgroundColor: '#F1D58A',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  noteText: {
    color: 'rgba(245, 238, 255, 0.78)',
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    gap: 14,
  },
  sectionLabel: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cards: {
    gap: 18,
  },
  interpretationPanel: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.085)',
    padding: 20,
    gap: 12,
  },
  panelLabel: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  bodyText: {
    color: 'rgba(245, 238, 255, 0.82)',
    fontSize: 16,
    lineHeight: 24,
  },
});
