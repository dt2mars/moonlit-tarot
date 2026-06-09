import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { STRINGS } from '../data/localization';
import type { Language } from '../types';

type HomeScreenProps = {
  language: Language;
  onDailyCard: () => void;
  onStartReading: () => void;
  onJournal: () => void;
  onSettings: () => void;
};

export function HomeScreen({
  language,
  onDailyCard,
  onStartReading,
  onJournal,
  onSettings,
}: HomeScreenProps) {
  const copy = STRINGS[language].home;

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.moonSeal}>
            <View style={styles.innerMoon} />
          </View>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.subtitle}>{copy.subtitle}</Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton title={copy.dailyCard} onPress={onDailyCard} />
          <PrimaryButton title={copy.startReading} onPress={onStartReading} variant="secondary" />
          <PrimaryButton title={copy.journal} onPress={onJournal} variant="ghost" />
          <PrimaryButton title={copy.settings} onPress={onSettings} variant="ghost" />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 36,
    gap: 38,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 26,
    gap: 18,
  },
  moonSeal: {
    width: 112,
    height: 112,
    borderRadius: 56,
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
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 320,
    color: 'rgba(245, 238, 255, 0.78)',
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center',
  },
  actions: {
    gap: 13,
  },
});
