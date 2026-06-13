import { StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ReadingCard } from '../components/ReadingCard';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { STRINGS } from '../data/localization';
import type { Language, ReadingTypeId } from '../types';

type HomeScreenProps = {
  language: Language;
  onDailyFortune: () => void;
  onDailyLoveCard: () => void;
  onSelectReadingType: (readingType: ReadingTypeId) => void;
  onJournal: () => void;
  onPreviewPlus: () => void;
  onSettings: () => void;
};

export function HomeScreen({
  language,
  onDailyFortune,
  onDailyLoveCard,
  onSelectReadingType,
  onJournal,
  onPreviewPlus,
  onSettings,
}: HomeScreenProps) {
  const allCopy = STRINGS[language];
  const copy = allCopy.home;
  const relationshipTypes: ReadingTypeId[] = [
    'loveClarity',
    'noContact',
    'exReconciliation',
    'closure',
  ];

  return (
    <GradientBackground>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <View style={styles.phaseRow}>
              <View style={[styles.phaseMoon, styles.phaseNew]} />
              <View style={[styles.phaseMoon, styles.phaseHalf]} />
              <View style={[styles.phaseMoon, styles.phaseFull]} />
              <View style={[styles.phaseMoon, styles.phaseHalf]} />
              <View style={[styles.phaseMoon, styles.phaseNew]} />
            </View>
            <Text style={styles.eyebrow}>{copy.eyebrow}</Text>
            <Text style={styles.title}>{copy.title}</Text>
            <Text style={styles.subtitle}>{copy.subtitle}</Text>
          </View>
          <View style={styles.ritualPanel}>
            <Text style={styles.ritualText}>{copy.ritualLine}</Text>
          </View>
        </View>

        <View style={styles.sections}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{copy.todayTitle}</Text>
            <ReadingCard
              meta="01"
              title={copy.dailyFortune}
              subtitle={copy.dailyFortuneSubtitle}
              onPress={onDailyFortune}
            />
            <ReadingCard
              meta="02"
              title={copy.dailyLoveCard}
              subtitle={copy.dailyLoveSubtitle}
              onPress={onDailyLoveCard}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{copy.relationshipTitle}</Text>
            {relationshipTypes.map((readingType, index) => (
              <ReadingCard
                key={readingType}
                meta={`${index + 1}`.padStart(2, '0')}
                title={allCopy.readingTypes.labels[readingType]}
                subtitle={allCopy.readingTypes.descriptions[readingType]}
                onPress={() => onSelectReadingType(readingType)}
              />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{copy.journalTitle}</Text>
            <PrimaryButton title={copy.journal} onPress={onJournal} />
            <View style={styles.plusPanel}>
              <Text style={styles.plusTitle}>{allCopy.plus.title}</Text>
              <Text style={styles.plusBody}>{allCopy.plus.homeTeaserBody}</Text>
              <PrimaryButton
                title={allCopy.plus.teaserButton}
                onPress={onPreviewPlus}
                variant="secondary"
              />
            </View>
            <PrimaryButton title={copy.settings} onPress={onSettings} variant="ghost" />
          </View>
        </View>
      </ScreenScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: 26,
  },
  hero: {
    paddingTop: 34,
    gap: 14,
  },
  eyebrow: {
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginBottom: 2,
  },
  phaseMoon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.62)',
  },
  phaseNew: {
    backgroundColor: 'rgba(7, 8, 28, 0.36)',
  },
  phaseHalf: {
    backgroundColor: 'rgba(241, 213, 138, 0.42)',
  },
  phaseFull: {
    backgroundColor: 'rgba(241, 213, 138, 0.9)',
  },
  title: {
    color: '#FFF8EA',
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
    lineHeight: 50,
  },
  heroCopy: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 6,
    gap: 10,
  },
  subtitle: {
    maxWidth: 360,
    color: 'rgba(245, 238, 255, 0.78)',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
  },
  ritualPanel: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  ritualText: {
    color: 'rgba(255, 248, 234, 0.78)',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  sections: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  plusPanel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.24)',
    backgroundColor: 'rgba(241, 213, 138, 0.08)',
    padding: 18,
    gap: 10,
  },
  plusTitle: {
    color: '#FFF8EA',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0,
  },
  plusBody: {
    color: 'rgba(245, 238, 255, 0.76)',
    fontSize: 14,
    lineHeight: 21,
  },
});
