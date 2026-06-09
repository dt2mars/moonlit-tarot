import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title={copy.journal.title} subtitle={copy.journal.subtitle} />

        <View style={styles.list}>
          {readings.length === 0 ? (
            <View style={styles.emptyPanel}>
              <Text style={styles.emptyText}>{copy.journal.empty}</Text>
            </View>
          ) : (
            readings.map((reading) => (
              <View key={reading.id} style={styles.readingItem}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => onOpen(reading)}
                  style={({ pressed }) => [styles.readingPressable, pressed ? styles.pressed : null]}
                >
                  <Text style={styles.date}>{formatDate(reading.createdAt)}</Text>
                  <Text numberOfLines={1} style={styles.type}>
                    {copy.readingTypes.labels[reading.readingType]}
                  </Text>
                  <Text numberOfLines={2} style={styles.question}>
                    {reading.question}
                  </Text>
                  <Text numberOfLines={2} style={styles.cards}>
                    {reading.cards.map((drawnCard) => drawnCard.card.name).join('  |  ')}
                  </Text>
                </Pressable>
                <PrimaryButton
                  title={copy.journal.delete}
                  onPress={() => confirmDelete(reading)}
                  variant="danger"
                />
              </View>
            ))
          )}
        </View>

        <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
      </ScrollView>
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
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 26,
    gap: 22,
  },
  list: {
    gap: 14,
  },
  emptyPanel: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 22,
  },
  emptyText: {
    color: 'rgba(245, 238, 255, 0.75)',
    fontSize: 16,
    textAlign: 'center',
  },
  readingItem: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    padding: 14,
    gap: 12,
  },
  readingPressable: {
    gap: 6,
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
    fontSize: 20,
    fontWeight: '800',
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
});
