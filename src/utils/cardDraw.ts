import { MAJOR_ARCANA } from '../data/tarotCards';
import type { DrawnCard, SpreadSize } from '../types';

const SPREAD_POSITIONS: Record<SpreadSize, string[]> = {
  1: ['Heart of the matter'],
  3: ['Past energy', 'Present energy', 'Next step'],
};

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export function drawCards(spreadSize: SpreadSize): DrawnCard[] {
  const positions = SPREAD_POSITIONS[spreadSize];
  const cards = shuffle(MAJOR_ARCANA).slice(0, spreadSize);

  return cards.map((card, index) => ({
    card,
    orientation: Math.random() > 0.25 ? 'upright' : 'reversed',
    position: positions[index],
  }));
}
