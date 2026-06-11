import type { ImageSourcePropType } from 'react-native';

export type Language = 'en' | 'ko';

export type ReadingTypeId =
  | 'dailyFortune'
  | 'noContact'
  | 'exReconciliation'
  | 'loveClarity'
  | 'closure'
  | 'dailyLoveCard';

export type SpreadSize = 1 | 3;

export type CardOrientation = 'upright' | 'reversed';

export type AppScreen =
  | 'home'
  | 'readingTypes'
  | 'question'
  | 'draw'
  | 'result'
  | 'journal'
  | 'journalDetail'
  | 'settings';

export interface TarotCardData {
  id: string;
  name: string;
  imageSource: ImageSourcePropType;
  uprightMeaning: string;
  reversedMeaning: string;
  loveMeaning: string;
  advice: string;
}

export interface DrawnCard {
  card: TarotCardData;
  orientation: CardOrientation;
  position: string;
}

export interface ReadingTypeMeta {
  id: ReadingTypeId;
  title: string;
  subtitle: string;
}

export interface SavedReading {
  id: string;
  createdAt: string;
  readingType: ReadingTypeId;
  question: string;
  spreadSize: SpreadSize;
  cards: DrawnCard[];
  interpretation: string;
}
