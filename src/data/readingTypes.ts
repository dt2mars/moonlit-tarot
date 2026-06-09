import type { ReadingTypeMeta } from '../types';

export const READING_TYPES: ReadingTypeMeta[] = [
  {
    id: 'noContact',
    title: 'No Contact',
    subtitle: 'For silence, restraint, waiting, and emotional distance.',
  },
  {
    id: 'exReconciliation',
    title: 'Ex / Reconciliation',
    subtitle: 'For past connections, repair, longing, and honest timing.',
  },
  {
    id: 'loveClarity',
    title: 'Love Clarity',
    subtitle: 'For mixed signals, new feelings, and relationship direction.',
  },
  {
    id: 'closure',
    title: 'Closure',
    subtitle: 'For acceptance, release, grief, and moving forward gently.',
  },
  {
    id: 'dailyLoveCard',
    title: 'Daily Love Card',
    subtitle: 'A one-card message for your heart today.',
  },
];

export function getReadingTypeMeta(id: ReadingTypeMeta['id']): ReadingTypeMeta {
  return READING_TYPES.find((readingType) => readingType.id === id) ?? READING_TYPES[0];
}
