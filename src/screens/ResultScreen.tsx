import { StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { SectionTitle } from '../components/SectionTitle';
import { TarotCard } from '../components/TarotCard';
import { STRINGS } from '../data/localization';
import {
  getCardAdviceForDisplay,
  getCardMeaningForDisplay,
  getLocalizedCardName,
} from '../data/cardCopy';
import { generateKoreanDailyFortuneReading } from '../utils/mockAi';
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
  onPreviewPlus: () => void;
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
  onPreviewPlus,
  onBack,
}: ResultScreenProps) {
  const copy = STRINGS[language];
  const isDailyFortune = readingType === 'dailyFortune';
  const isKoreanDailyFortune = language === 'ko' && readingType === 'dailyFortune';
  const displayedInterpretation = isKoreanDailyFortune
    ? generateKoreanDailyFortuneReading(cards)
    : interpretation;
  const interpretationLabel = copy.result.interpretation;

  return (
    <GradientBackground>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          title={copy.result.title}
          subtitle={copy.readingTypes.labels[readingType]}
          eyebrow="Moonlit Tarot"
        />

        {isKoreanDailyFortune ? null : <InfoPanel label={copy.result.question} value={question} />}

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{copy.result.cards}</Text>
          <View style={styles.cards}>
            {cards.map((drawnCard, index) => (
              <View key={`${drawnCard.card.id}-${index}`} style={styles.cardMeaning}>
                <TarotCard
                  compact
                  drawnCard={drawnCard}
                  language={language}
                  readingType={readingType}
                  revealed
                  reversedLabel={copy.result.reversed}
                  uprightLabel={copy.result.upright}
                />
                {isDailyFortune ? null : (
                  <View style={styles.meaningPanel}>
                    <Text style={styles.cardName}>
                      {getLocalizedCardName(drawnCard.card, language)}
                    </Text>
                    <Text style={styles.bodyText}>
                      {getCardMeaningForDisplay(drawnCard, language, readingType)}
                    </Text>
                    <Text style={styles.adviceLabel}>{copy.result.advice}</Text>
                    <Text style={styles.bodyText}>
                      {getCardAdviceForDisplay(drawnCard, language, readingType)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <InfoPanel label={interpretationLabel} value={displayedInterpretation} />

        <View style={styles.plusPanel}>
          <Text style={styles.plusEyebrow}>Moonlit Plus</Text>
          <Text style={styles.plusTitle}>{copy.plus.teaserTitle}</Text>
          <Text style={styles.plusBody}>{copy.plus.teaserBody}</Text>
          <PrimaryButton
            title={copy.plus.teaserButton}
            onPress={onPreviewPlus}
            variant="secondary"
          />
        </View>

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
      </ScreenScrollView>
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
    gap: 22,
  },
  section: {
    gap: 14,
  },
  sectionLabel: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cards: {
    gap: 18,
  },
  cardMeaning: {
    gap: 12,
  },
  panel: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.085)',
    padding: 20,
    gap: 12,
  },
  meaningPanel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.14)',
    backgroundColor: 'rgba(7, 8, 28, 0.42)',
    padding: 18,
    gap: 9,
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
    fontSize: 19,
    fontWeight: '900',
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
    color: 'rgba(245, 238, 255, 0.82)',
    fontSize: 16,
    lineHeight: 24,
  },
  plusPanel: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.28)',
    backgroundColor: 'rgba(241, 213, 138, 0.09)',
    padding: 20,
    gap: 12,
  },
  plusEyebrow: {
    color: '#F1D58A',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  plusTitle: {
    color: '#FFF8EA',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 27,
  },
  plusBody: {
    color: 'rgba(245, 238, 255, 0.78)',
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: 12,
  },
});
