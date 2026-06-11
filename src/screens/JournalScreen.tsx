import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { SectionTitle } from '../components/SectionTitle';
import { getLocalizedCardName } from '../data/cardCopy';
import { STRINGS } from '../data/localization';
import type { Language, SavedReading } from '../types';

type JournalScreenProps = {
  language: Language;
  readings: SavedReading[];
  onOpen: (reading: SavedReading) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
};

export function JournalScreen({
  language,
  readings,
  onOpen,
  onDelete,
  onBack,
}: JournalScreenProps) {
  const copy = STRINGS[language];

  const confirmDelete = (reading: SavedReading) => {
    Alert.alert(copy.journal.delete, reading.question, [
      { text: copy.common.back, style: 'cancel' },
      {
        text: copy.journal.delete,
        style: 'destructive',
        onPress: () => onDelete(reading.id),
      },
    ]);
  };

  return (
    <GradientBackground>
      <ScreenScrollView contentContainerStyle={styles.content}>
        <SectionTitle title={copy.journal.title} subtitle={copy.journal.subtitle} />

        <View style={styles.list}>
          {readings.length === 0 ? (
            <View style={styles.emptyPanel}>
              <View style={styles.emptyMoon} />
              <Text style={styles.emptyTitle}>{copy.journal.emptyTitle}</Text>
              <Text style={styles.emptyText}>{copy.journal.empty}</Text>
            </View>
          ) : (
            readings.map((reading) => (
              <View key={reading.id} style={styles.readingItem}>
                <View style={styles.readingHeader}>
                  <View style={styles.readingMeta}>
                    <Text style={styles.date}>{formatDate(reading.createdAt)}</Text>
                    <Text numberOfLines={1} style={styles.type}>
                      {copy.readingTypes.labels[reading.readingType]}
                    </Text>
                  </View>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => confirmDelete(reading)}
                    style={({ pressed }) => [styles.deletePill, pressed ? styles.pressed : null]}
                  >
                    <Text style={styles.deleteText}>{copy.journal.delete}</Text>
                  </Pressable>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => onOpen(reading)}
                  style={({ pressed }) => [styles.readingPressable, pressed ? styles.pressed : null]}
                >
                  <Text numberOfLines={2} style={styles.question}>
                    {reading.question}
                  </Text>
                  <Text numberOfLines={2} style={styles.cards}>
                    {reading.cards
                      .map((drawnCard) => getLocalizedCardName(drawnCard.card, language))
                      .join('  |  ')}
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>

        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
      </ScreenScrollView>
    </GradientBackground>
  );
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  content: {
    gap: 22,
  },
  list: {
    gap: 14,
  },
  emptyPanel: {
    minHeight: 220,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.16)',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyMoon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(241, 213, 138, 0.82)',
    shadowColor: '#F1D58A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 6,
  },
  emptyTitle: {
    color: '#FFF8EA',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  emptyText: {
    color: 'rgba(245, 238, 255, 0.74)',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  readingItem: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    gap: 14,
  },
  readingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  readingMeta: {
    flex: 1,
    gap: 5,
  },
  readingPressable: {
    gap: 8,
  },
  pressed: {
    opacity: 0.78,
  },
  date: {
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  type: {
    color: '#FFF8EA',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0,
  },
  question: {
    color: 'rgba(245, 238, 255, 0.82)',
    fontSize: 15,
    lineHeight: 21,
  },
  cards: {
    color: 'rgba(241, 213, 138, 0.84)',
    fontSize: 13,
    lineHeight: 18,
  },
  deletePill: {
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 148, 0.28)',
    backgroundColor: 'rgba(128, 39, 72, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  deleteText: {
    color: '#FFD8DE',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
});
