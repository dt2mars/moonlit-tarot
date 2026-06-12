import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';

import { CardDrawScreen } from './src/screens/CardDrawScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { JournalScreen } from './src/screens/JournalScreen';
import { PlusPreviewScreen } from './src/screens/PlusPreviewScreen';
import { PlusSampleScreen } from './src/screens/PlusSampleScreen';
import { QuestionScreen } from './src/screens/QuestionScreen';
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
import {
  deleteReading,
  getSavedLanguage,
  getSavedReadings,
  saveLanguage,
  saveReading,
} from './src/utils/storage';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [readings, setReadings] = useState<SavedReading[]>([]);
  const [selectedReadingType, setSelectedReadingType] =
    useState<ReadingTypeId>('loveClarity');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentSpreadSize, setCurrentSpreadSize] = useState<SpreadSize>(1);
  const [currentCards, setCurrentCards] = useState<DrawnCard[]>([]);
  const [currentInterpretation, setCurrentInterpretation] = useState('');
  const [savedReadingId, setSavedReadingId] = useState<string | null>(null);
  const [selectedSavedReading, setSelectedSavedReading] = useState<SavedReading | null>(null);

  const refreshReadings = useCallback(async () => {
    const savedReadings = await getSavedReadings();
    setReadings(savedReadings);
  }, []);

  useEffect(() => {
    void refreshReadings();
  }, [refreshReadings]);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await getSavedLanguage();
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    };

    void loadLanguage();
  }, []);

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    void saveLanguage(nextLanguage);
  };

  const startDailyFortune = () => {
    const dailyQuestion = STRINGS[language].question.defaultDailyFortuneQuestion;
    setSelectedReadingType('dailyFortune');
    setCurrentQuestion(dailyQuestion);
    setCurrentSpreadSize(1);
    setCurrentCards([]);
    setCurrentInterpretation('');
    setSavedReadingId(null);
    setScreen('draw');
  };

  const startDailyLoveCard = () => {
    const dailyQuestion = STRINGS[language].question.defaultDailyQuestion;
    setSelectedReadingType('dailyLoveCard');
    setCurrentQuestion(dailyQuestion);
    setCurrentSpreadSize(1);
    setCurrentCards([]);
    setCurrentInterpretation('');
    setSavedReadingId(null);
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
    setScreen('draw');
  };

  const completeCardDraw = (cards: DrawnCard[]) => {
    const interpretation = generateMockReading(currentQuestion, selectedReadingType, cards, language);
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
    setSelectedSavedReading(null);
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'question':
        return (
          <QuestionScreen
            language={language}
            readingType={selectedReadingType}
            onBack={() => setScreen('home')}
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
            onBack={() => setScreen('home')}
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
            onPreviewPlus={() => setScreen('plusPreview')}
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
            onBack={() => setScreen('home')}
            onNewReading={startNewReading}
            onPreviewPlus={() => setScreen('plusPreview')}
          />
        );
      case 'plusPreview':
        return (
          <PlusPreviewScreen
            language={language}
            onTrySample={() => setScreen('plusSample')}
            onBack={() => setScreen('home')}
          />
        );
      case 'plusSample':
        return (
          <PlusSampleScreen
            language={language}
            onBack={() => setScreen('home')}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            appVersion="1.0.0"
            language={language}
            onBack={() => setScreen('home')}
            onLanguageChange={handleLanguageChange}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            language={language}
            onDailyFortune={startDailyFortune}
            onDailyLoveCard={startDailyLoveCard}
            onJournal={openJournal}
            onPreviewPlus={() => setScreen('plusPreview')}
            onSelectReadingType={selectReadingType}
            onSettings={() => setScreen('settings')}
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
