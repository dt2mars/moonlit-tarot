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
  onViewAllReadings: () => void;
  onJournal: () => void;
  onPreviewPlus: () => void;
  onSettings: () => void;
};

export function HomeScreen({
  language,
  onDailyFortune,
  onDailyLoveCard,
  onSelectReadingType,
  onViewAllReadings,
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
          <Text style={styles.eyebrow}>{copy.eyebrow}</Text>
          <View style={styles.moonStage}>
            <View style={styles.orbitOuter} />
            <View style={styles.orbitInner} />
            <View style={styles.moonSeal}>
              <View style={styles.innerMoon} />
            </View>
          </View>
          <View style={styles.heroCopy}>
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
            <PrimaryButton
              title={allCopy.readingTypes.title}
              onPress={onViewAllReadings}
              variant="secondary"
            />
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
    gap: 30,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 18,
    gap: 20,
  },
  eyebrow: {
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  moonStage: {
    width: 184,
    height: 184,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitOuter: {
    position: 'absolute',
    width: 178,
    height: 178,
    borderRadius: 89,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.16)',
  },
  orbitInner: {
    position: 'absolute',
    width: 136,
    height: 136,
    borderRadius: 68,
    borderWidth: 1,
    borderColor: 'rgba(215, 183, 255, 0.18)',
  },
  moonSeal: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.34)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  innerMoon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#F1D58A',
    shadowColor: '#F1D58A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 26,
    elevation: 8,
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
