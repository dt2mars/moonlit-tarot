import { getReadingTypeMeta } from '../data/readingTypes';
import type { DrawnCard, ReadingTypeId } from '../types';

export function generateMockReading(
  question: string,
  readingType: ReadingTypeId,
  cards: DrawnCard[],
): string {
  const type = getReadingTypeMeta(readingType).title;
  const cardNames = cards
    .map((drawnCard) => {
      const orientation = drawnCard.orientation === 'upright' ? 'upright' : 'reversed';
      return `${drawnCard.card.name} ${orientation}`;
    })
    .join(', ');
  const mainCard = cards[0];
  const closingCard = cards[cards.length - 1];
  const hasReversal = cards.some((drawnCard) => drawnCard.orientation === 'reversed');

  const opening =
    `For this ${type} reading, your question sits in a tender place: "${question}". ` +
    `The cards drawn are ${cardNames}.`;

  const emotionalTheme =
    `The strongest message comes through ${mainCard.card.name}. ` +
    `${mainCard.card.loveMeaning} This suggests that the answer is less about forcing certainty and more about noticing what brings your heart back to steadiness.`;

  const reversalNote = hasReversal
    ? 'Because at least one card is reversed, the reading gently points toward an inner block, mixed timing, or a truth that may need more room before it can be acted on.'
    : 'With the cards mostly upright, the reading feels direct and supportive, asking you to trust what has already become clear.';

  const action =
    `The practical guidance is simple: ${closingCard.card.advice} ` +
    'If you are tempted to reach out, pause long enough to ask whether the message would create peace or reopen the ache. If you are trying to move on, let closure be a practice rather than a single decision.';

  return `${opening}\n\n${emotionalTheme}\n\n${reversalNote}\n\n${action}`;
}
