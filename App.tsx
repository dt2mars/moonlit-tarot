import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import { CardDrawScreen } from './src/screens/CardDrawScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { JournalScreen } from './src/screens/JournalScreen';
import { QuestionScreen } from './src/screens/QuestionScreen';
import { ReadingTypeScreen } from './src/screens/ReadingTypeScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import type {
  AppScreen,
  DrawnCard,
  Language,
  ReadingTypeId,
  SavedReading,
  SpreadSize,
} from './src/types';
import { STRINGS } from './src/data/localization';
import { generateMockReading } from './src/utils/mockAi';
import { deleteReading, getSavedReadings, saveReading } from './src/utils/storage';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [selectedReadingType, setSelectedReadingType] =
    useState<ReadingTypeId>('loveClarity');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentSpreadSize, setCurrentSpreadSize] = useState<SpreadSize>(3);
  const [currentCards, setCurrentCards] = useState<DrawnCard[]>([]);
  const [currentInterpretation, setCurrentInterpretation] = useState('');
  const [savedReadingId, setSavedReadingId] = useState<string | null>(null);
  const [selectedSavedReading, setSelectedSavedReading] = useState<SavedReading | null>(null);
  const [drawBackTarget, setDrawBackTarget] = useState<AppScreen>('question');

  const refreshReadings = useCallback(async () => {
    const savedReadings = await getSavedReadings();
    setReadings(savedReadings);
  }, []);

  useEffect(() => {
    void refreshReadings();
  }, [refreshReadings]);

  const startDailyCard = () => {
    const dailyQuestion = STRINGS[language].question.defaultDailyQuestion;
    setSelectedReadingType('dailyLoveCard');
    setCurrentQuestion(dailyQuestion);
    setCurrentSpreadSize(1);
    setCurrentCards([]);
    setCurrentInterpretation('');
    setSavedReadingId(null);
    setDrawBackTarget('home');
    setScreen('draw');
  };

  const selectReadingType = (readingType: ReadingTypeId) => {
    setSelectedReadingType(readingType);
    setScreen('question');
  };

  const startQuestionReading = (question: string, spreadSize: SpreadSize) => {
    setCurrentQuestion(question);
    setCurrentSpreadSize(spreadSize);
    setCurrentCards([]);
    setCurrentInterpretation('');
    setSavedReadingId(null);
    setDrawBackTarget('question');
    setScreen('draw');
  };

  const completeCardDraw = (cards: DrawnCard[]) => {
    const interpretation = generateMockReading(currentQuestion, selectedReadingType, cards);
    setCurrentCards(cards);
    setCurrentInterpretation(interpretation);
    setScreen('result');
  };

  const saveCurrentReading = async () => {
    if (savedReadingId || currentCards.length === 0) {
      return;
    }

    const savedReading = await saveReading({
      readingType: selectedReadingType,
      question: currentQuestion,
      spreadSize: currentSpreadSize,
      cards: currentCards,
      interpretation: currentInterpretation,
    });

    setSavedReadingId(savedReading.id);
    await refreshReadings();
  };

  const openJournal = async () => {
    await refreshReadings();
    setScreen('journal');
  };

  const deleteSavedReading = async (id: string) => {
    const nextReadings = await deleteReading(id);
    setReadings(nextReadings);

    if (selectedSavedReading?.id === id) {
      setSelectedSavedReading(null);
      setScreen('journal');
    }
  };

  const openSavedReading = (reading: SavedReading) => {
    setSelectedSavedReading(reading);
    setScreen('journalDetail');
  };

  const startNewReading = () => {
    setSavedReadingId(null);
    setCurrentCards([]);
    setCurrentInterpretation('');
    setScreen('readingTypes');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'readingTypes':
        return (
          <ReadingTypeScreen
            language={language}
            onBack={() => setScreen('home')}
            onSelect={selectReadingType}
          />
        );
      case 'question':
        return (
          <QuestionScreen
            initialSpreadSize={selectedReadingType === 'dailyLoveCard' ? 1 : 3}
            language={language}
            readingType={selectedReadingType}
            onBack={() => setScreen('readingTypes')}
            onStart={startQuestionReading}
          />
        );
      case 'draw':
        return (
          <CardDrawScreen
            key={`${selectedReadingType}-${currentQuestion}-${currentSpreadSize}`}
            language={language}
            readingType={selectedReadingType}
            spreadSize={currentSpreadSize}
            onBack={() => setScreen(drawBackTarget)}
            onComplete={completeCardDraw}
          />
        );
      case 'result':
        return (
          <ResultScreen
            cards={currentCards}
            interpretation={currentInterpretation}
            language={language}
            question={currentQuestion}
            readingType={selectedReadingType}
            saved={Boolean(savedReadingId)}
            onBack={() => setScreen('home')}
            onNewReading={startNewReading}
            onSave={saveCurrentReading}
          />
        );
      case 'journal':
        return (
          <JournalScreen
            language={language}
            readings={readings}
            onBack={() => setScreen('home')}
            onDelete={deleteSavedReading}
            onOpen={openSavedReading}
          />
        );
      case 'journalDetail':
        if (!selectedSavedReading) {
          return (
            <JournalScreen
              language={language}
              readings={readings}
              onBack={() => setScreen('home')}
              onDelete={deleteSavedReading}
              onOpen={openSavedReading}
            />
          );
        }

        return (
          <ResultScreen
            cards={selectedSavedReading.cards}
            interpretation={selectedSavedReading.interpretation}
            language={language}
            question={selectedSavedReading.question}
            readingType={selectedSavedReading.readingType}
            saved
            onBack={() => setScreen('journal')}
            onNewReading={startNewReading}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            appVersion="1.0.0"
            language={language}
            onBack={() => setScreen('home')}
            onLanguageChange={setLanguage}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            language={language}
            onDailyCard={startDailyCard}
            onJournal={openJournal}
            onSettings={() => setScreen('settings')}
            onStartReading={() => setScreen('readingTypes')}
          />
        );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {renderScreen()}
    </>
  );
}
