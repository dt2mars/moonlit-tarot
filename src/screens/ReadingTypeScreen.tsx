import { ScrollView, StyleSheet, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ReadingCard } from '../components/ReadingCard';
import { SectionTitle } from '../components/SectionTitle';
import { STRINGS } from '../data/localization';
import { READING_TYPES } from '../data/readingTypes';
import type { Language, ReadingTypeId } from '../types';

type ReadingTypeScreenProps = {
  language: Language;
  onSelect: (readingType: ReadingTypeId) => void;
  onBack: () => void;
};

export function ReadingTypeScreen({ language, onSelect, onBack }: ReadingTypeScreenProps) {
  const copy = STRINGS[language];

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle
          title={copy.readingTypes.title}
          subtitle={copy.readingTypes.subtitle}
          eyebrow="Moonlit Tarot"
        />

        <View style={styles.list}>
          {READING_TYPES.map((readingType) => (
            <ReadingCard
              key={readingType.id}
              title={copy.readingTypes.labels[readingType.id]}
              subtitle={copy.readingTypes.descriptions[readingType.id]}
              onPress={() => onSelect(readingType.id)}
            />
          ))}
        </View>

        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
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
  list: {
    gap: 12,
  },
});
