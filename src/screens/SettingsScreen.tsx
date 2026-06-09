import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import { STRINGS } from '../data/localization';
import type { Language } from '../types';

type SettingsScreenProps = {
  language: Language;
  appVersion: string;
  onLanguageChange: (language: Language) => void;
  onBack: () => void;
};

export function SettingsScreen({
  language,
  appVersion,
  onLanguageChange,
  onBack,
}: SettingsScreenProps) {
  const copy = STRINGS[language];

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title={copy.settings.title} />

        <View style={styles.panel}>
          <Text style={styles.panelLabel}>{copy.settings.language}</Text>
          <View style={styles.languageRow}>
            <LanguageOption
              label={copy.settings.english}
              selected={language === 'en'}
              onPress={() => onLanguageChange('en')}
            />
            <LanguageOption
              label={copy.settings.korean}
              selected={language === 'ko'}
              onPress={() => onLanguageChange('ko')}
            />
          </View>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelLabel}>{copy.settings.disclaimerTitle}</Text>
          <Text style={styles.bodyText}>{copy.settings.disclaimer}</Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelLabel}>{copy.settings.version}</Text>
          <Text style={styles.version}>{appVersion}</Text>
        </View>

        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
      </ScrollView>
    </GradientBackground>
  );
}

type LanguageOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function LanguageOption({ label, selected, onPress }: LanguageOptionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.languageOption,
        selected ? styles.languageOptionSelected : null,
        pressed ? styles.languageOptionPressed : null,
      ]}
    >
      <Text style={[styles.languageText, selected ? styles.languageTextSelected : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 26,
    gap: 18,
  },
  panel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    padding: 18,
    gap: 12,
  },
  panelLabel: {
    color: '#D7B7FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  languageRow: {
    flexDirection: 'row',
    gap: 10,
  },
  languageOption: {
    flex: 1,
    minHeight: 50,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  languageOptionSelected: {
    borderColor: 'rgba(241, 213, 138, 0.68)',
    backgroundColor: 'rgba(241, 213, 138, 0.17)',
  },
  languageOptionPressed: {
    opacity: 0.86,
  },
  languageText: {
    color: 'rgba(245, 238, 255, 0.72)',
    fontSize: 15,
    fontWeight: '800',
  },
  languageTextSelected: {
    color: '#FFF8EA',
  },
  bodyText: {
    color: 'rgba(245, 238, 255, 0.78)',
    fontSize: 15,
    lineHeight: 23,
  },
  version: {
    color: '#FFF8EA',
    fontSize: 18,
    fontWeight: '800',
  },
});
