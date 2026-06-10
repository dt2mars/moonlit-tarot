import { StyleSheet, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ReadingCard } from '../components/ReadingCard';
import { ScreenScrollView } from '../components/ScreenScrollView';
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
      <ScreenScrollView contentContainerStyle={styles.content}>
        <SectionTitle
          title={copy.readingTypes.title}
          subtitle={copy.readingTypes.subtitle}
          eyebrow="Moonlit Tarot"
        />

        <View style={styles.list}>
          {READING_TYPES.map((readingType, index) => (
            <ReadingCard
              key={readingType.id}
              meta={`${index + 1}`.padStart(2, '0')}
              title={copy.readingTypes.labels[readingType.id]}
              subtitle={copy.readingTypes.descriptions[readingType.id]}
              onPress={() => onSelect(readingType.id)}
            />
          ))}
        </View>

        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
      </ScreenScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 24,
  },
  list: {
    gap: 14,
  },
});
