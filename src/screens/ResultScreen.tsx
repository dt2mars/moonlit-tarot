import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import { TarotCard } from '../components/TarotCard';
import { STRINGS } from '../data/localization';
import type { DrawnCard, Language, ReadingTypeId } from '../types';

type ResultScreenProps = {
  language: Language;
  readingType: ReadingTypeId;
  question: string;
  cards: DrawnCard[];
  interpretation: string;
  saved?: boolean;
  onSave?: () => void;
  onNewReading: () => void;
  onBack: () => void;
};

export function ResultScreen({
  language,
  readingType,
  question,
  cards,
  interpretation,
  saved = false,
  onSave,
  onNewReading,
  onBack,
}: ResultScreenProps) {
  const copy = STRINGS[language];

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle
          title={copy.result.title}
          subtitle={copy.readingTypes.labels[readingType]}
          eyebrow="Moonlit Tarot"
        />

        <InfoPanel label={copy.result.question} value={question} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{copy.result.cards}</Text>
          <View style={styles.cards}>
            {cards.map((drawnCard, index) => (
              <View key={`${drawnCard.card.id}-${index}`} style={styles.cardMeaning}>
                <TarotCard
                  compact
                  drawnCard={drawnCard}
                  revealed
                  reversedLabel={copy.result.reversed}
                  uprightLabel={copy.result.upright}
                />
                <View style={styles.meaningPanel}>
                  <Text style={styles.cardName}>{drawnCard.card.name}</Text>
                  <Text style={styles.bodyText}>
                    {drawnCard.orientation === 'upright'
                      ? drawnCard.card.uprightMeaning
                      : drawnCard.card.reversedMeaning}
                  </Text>
                  <Text style={styles.adviceLabel}>{copy.result.advice}</Text>
                  <Text style={styles.bodyText}>{drawnCard.card.advice}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <InfoPanel label={copy.result.interpretation} value={interpretation} />

        <View style={styles.actions}>
          {onSave ? (
            <PrimaryButton
              disabled={saved}
              title={saved ? copy.result.saved : copy.result.save}
              onPress={onSave}
            />
          ) : null}
          <PrimaryButton title={copy.result.newReading} onPress={onNewReading} variant="secondary" />
          <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

type InfoPanelProps = {
  label: string;
  value: string;
};

function InfoPanel({ label, value }: InfoPanelProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelLabel}>{label}</Text>
      <Text style={styles.bodyText}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 26,
    gap: 20,
  },
  section: {
    gap: 12,
  },
  sectionLabel: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cards: {
    gap: 14,
  },
  cardMeaning: {
    gap: 12,
  },
  panel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    padding: 18,
    gap: 10,
  },
  meaningPanel: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(9, 9, 30, 0.28)',
    padding: 16,
    gap: 8,
  },
  panelLabel: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cardName: {
    color: '#FFF8EA',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0,
  },
  adviceLabel: {
    color: '#F1D58A',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  bodyText: {
    color: 'rgba(245, 238, 255, 0.79)',
    fontSize: 15,
    lineHeight: 23,
  },
  actions: {
    gap: 12,
  },
});
