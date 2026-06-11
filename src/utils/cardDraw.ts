import { MAJOR_ARCANA } from '../data/tarotCards';
import type { DrawnCard, Language, ReadingTypeId, SpreadSize } from '../types';

const SPREAD_POSITIONS: Record<Language, Record<SpreadSize, string[]>> = {
  en: {
    1: ['Heart of the matter'],
    3: ['Past energy', 'Present energy', 'Next step'],
  },
  ko: {
    1: ['오늘의 핵심'],
    3: ['지난 흐름', '현재 흐름', '다음 조언'],
  },
};

const DAILY_POSITIONS: Record<Language, Partial<Record<ReadingTypeId, string>>> = {
  en: {
    dailyFortune: "Today's flow",
    dailyLoveCard: "Today's love energy",
  },
  ko: {
    dailyFortune: '오늘의 흐름',
    dailyLoveCard: '오늘의 연애운',
  },
};

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function drawCards(
  spreadSize: SpreadSize,
  language: Language = 'en',
  readingType?: ReadingTypeId,
): DrawnCard[] {
  const positions = getSpreadPositions(spreadSize, language, readingType);
  const cards = shuffle(MAJOR_ARCANA).slice(0, spreadSize);

  return cards.map((card, index) => ({
    card,
    orientation: Math.random() > 0.25 ? 'upright' : 'reversed',
    position: positions[index],
  }));
}

function getSpreadPositions(
  spreadSize: SpreadSize,
  language: Language,
  readingType?: ReadingTypeId,
) {
  if (spreadSize === 1 && readingType) {
    const dailyPosition = DAILY_POSITIONS[language][readingType];
    if (dailyPosition) {
      return [dailyPosition];
    }
  }

  return SPREAD_POSITIONS[language][spreadSize];
}
