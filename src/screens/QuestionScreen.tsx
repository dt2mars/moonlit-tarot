import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { GradientBackground } from '../components/GradientBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { SectionTitle } from '../components/SectionTitle';
import { STRINGS } from '../data/localization';
import type { Language, ReadingTypeId, SpreadSize } from '../types';

type QuestionScreenProps = {
  language: Language;
  readingType: ReadingTypeId;
  initialQuestion?: string;
  initialSpreadSize?: SpreadSize;
  onStart: (question: string, spreadSize: SpreadSize) => void;
  onBack: () => void;
};

export function QuestionScreen({
  language,
  readingType,
  initialQuestion = '',
  initialSpreadSize = 3,
  onStart,
  onBack,
}: QuestionScreenProps) {
  const copy = STRINGS[language];
  const [question, setQuestion] = useState(initialQuestion);
  const [spreadSize, setSpreadSize] = useState<SpreadSize>(initialSpreadSize);

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
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <SectionTitle
            title={copy.question.title}
            subtitle={copy.question.subtitle}
            eyebrow={copy.readingTypes.labels[readingType]}
          />

          <View style={styles.inputCard}>
            <TextInput
              multiline
              onChangeText={setQuestion}
              placeholder={copy.question.placeholder}
              placeholderTextColor="rgba(245, 238, 255, 0.42)"
              style={styles.input}
              textAlignVertical="top"
              value={question}
            />
          </View>

          <View style={styles.spreadControl}>
            <SpreadOption
              label={copy.question.oneCard}
              selected={spreadSize === 1}
              onPress={() => setSpreadSize(1)}
            />
            <SpreadOption
              label={copy.question.threeCards}
              selected={spreadSize === 3}
              onPress={() => setSpreadSize(3)}
            />
          </View>

          <View style={styles.actions}>
            <PrimaryButton title={copy.question.begin} onPress={submitQuestion} />
            <PrimaryButton title={copy.common.back} onPress={onBack} variant="ghost" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

type SpreadOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function SpreadOption({ label, selected, onPress }: SpreadOptionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.spreadOption,
        selected ? styles.spreadOptionSelected : null,
        pressed ? styles.spreadOptionPressed : null,
      ]}
    >
      <Text style={[styles.spreadLabel, selected ? styles.spreadLabelSelected : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 28,
    paddingTop: 26,
    gap: 22,
  },
  inputCard: {
    minHeight: 184,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 18,
  },
  input: {
    minHeight: 148,
    color: '#FFF8EA',
    fontSize: 18,
    lineHeight: 26,
  },
  spreadControl: {
    flexDirection: 'row',
    gap: 10,
  },
  spreadOption: {
    flex: 1,
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 12,
  },
  spreadOptionSelected: {
    borderColor: 'rgba(241, 213, 138, 0.68)',
    backgroundColor: 'rgba(241, 213, 138, 0.17)',
  },
  spreadOptionPressed: {
    opacity: 0.86,
  },
  spreadLabel: {
    color: 'rgba(245, 238, 255, 0.72)',
    fontSize: 15,
    fontWeight: '800',
  },
  spreadLabelSelected: {
    color: '#FFF8EA',
  },
  actions: {
    gap: 12,
  },
});
