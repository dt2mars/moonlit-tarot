import type { ReadingTypeMeta } from '../types';

export const READING_TYPES: ReadingTypeMeta[] = [
  {
    id: 'dailyFortune',
    title: 'Daily Fortune',
    subtitle: 'A quick card for your day, mood, and timing.',
  },
  {
    id: 'dailyLoveCard',
    title: 'Daily Love Card',
    subtitle: "A gentle look at today's emotional energy.",
  },
  {
    id: 'noContact',
    title: 'No Contact',
    subtitle: 'For silence, restraint, waiting, and the question of reaching out.',
  },
  {
    id: 'exReconciliation',
    title: 'Ex / Reconciliation',
    subtitle: 'For past love, repair, return, and honest timing.',
  },
  {
    id: 'loveClarity',
    title: 'Love Clarity',
    subtitle: 'For mixed signals, emotional availability, and relationship direction.',
  },
  {
    id: 'closure',
    title: 'Closure',
    subtitle: 'For acceptance, release, and a softer way forward.',
  },
];

export function getReadingTypeMeta(id: ReadingTypeMeta['id']): ReadingTypeMeta {
  return READING_TYPES.find((readingType) => readingType.id === id) ?? READING_TYPES[0];
}
