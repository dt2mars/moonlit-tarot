import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenScrollView } from '../components/ScreenScrollView';
import { SectionTitle } from '../components/SectionTitle';
import { STRINGS } from '../data/localization';
import type { Language, ReadingTypeId, SpreadSize } from '../types';

type QuestionScreenProps = {
  language: Language;
  readingType: ReadingTypeId;
  initialQuestion?: string;
  onStart: (question: string, spreadSize: SpreadSize) => void;
  onBack: () => void;
};

export function QuestionScreen({
  language,
  readingType,
  initialQuestion = '',
  onStart,
  onBack,
}: QuestionScreenProps) {
  const copy = STRINGS[language];
  const [question, setQuestion] = useState(initialQuestion);
  const spreadSize: SpreadSize = 1;
  const placeholder =
    readingType === 'dailyFortune' ? copy.question.dailyFortunePlaceholder : copy.question.placeholder;
  const spreadLabel =
    readingType === 'dailyFortune' || readingType === 'dailyLoveCard'
      ? copy.question.oneCard
      : copy.question.basicOneCardReading;

  const submitQuestion = () => {
    const trimmedQuestion = question.trim();
    onStart(trimmedQuestion || copy.question.emptyQuestion, spreadSize);
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScreenScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <SectionTitle
            title={copy.question.title}
            subtitle={copy.question.subtitle}
            eyebrow={copy.readingTypes.labels[readingType]}
          />

          <View style={styles.inputCard}>
            <TextInput
              multiline
              onChangeText={setQuestion}
              placeholder={placeholder}
              placeholderTextColor="rgba(245, 238, 255, 0.42)"
              style={styles.input}
              textAlignVertical="top"
              value={question}
            />
          </View>

          <View style={styles.spreadCard}>
            <Text style={styles.spreadMeta}>{copy.plus.freeTitle}</Text>
            <Text style={styles.spreadLabel}>{spreadLabel}</Text>
          </View>

          <View style={styles.actions}>
            <PrimaryButton title={copy.question.begin} onPress={submitQuestion} />
            <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
          </View>
        </ScreenScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    gap: 22,
  },
  inputCard: {
    minHeight: 206,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    backgroundColor: 'rgba(255, 255, 255, 0.085)',
    padding: 20,
  },
  input: {
    minHeight: 164,
    color: '#FFF8EA',
    fontSize: 18,
    lineHeight: 26,
  },
  spreadCard: {
    minHeight: 72,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(241, 213, 138, 0.28)',
    backgroundColor: 'rgba(241, 213, 138, 0.09)',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 6,
  },
  spreadMeta: {
    color: '#D7B7FF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  spreadLabel: {
    color: '#FFF8EA',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  actions: {
    gap: 12,
  },
});
