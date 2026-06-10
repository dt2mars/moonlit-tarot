import { getReadingTypeMeta } from '../data/readingTypes';
import type { DrawnCard, ReadingTypeId } from '../types';

type ReadingTypeGuidance = {
  focus: string;
  emotionalLens: string;
  caution: string;
  practice: string;
};

type QuestionKey = 'contact' | 'feelings' | 'closure' | 'reconciliation' | 'direction' | 'clarity';

type QuestionCue = {
  key: QuestionKey;
  theme: string;
  gentlePrompt: string;
};

const READING_GUIDANCE: Record<ReadingTypeId, ReadingTypeGuidance> = {
  noContact: {
    focus: 'silence, restraint, and what the quiet is revealing',
    emotionalLens:
      'The cards look less at whether you should break the silence and more at what the silence is teaching your nervous system.',
    caution: 'A message sent from panic may reopen the ache before it brings clarity.',
    practice:
      'Give yourself one calm pause before taking action, and ask whether contact would create steadiness or simply soothe urgency for a moment.',
  },
  exReconciliation: {
    focus: 'the past bond, repair, timing, and emotional accountability',
    emotionalLens:
      'The spread considers whether the old pattern has truly shifted, not only whether the feeling is still alive.',
    caution:
      'Longing can make familiar pain feel like proof of love, so behavior matters more than nostalgia here.',
    practice:
      'Let any possible return be measured by consistency, honesty, and the ability to meet the present differently than before.',
  },
  loveClarity: {
    focus: 'mixed signals, emotional availability, mutuality, and emotional safety',
    emotionalLens:
      'The cards point toward the difference between chemistry, clarity, and the safety of being met consistently.',
    caution:
      'Try not to turn uncertainty into a full story before the other person has shown enough through action.',
    practice:
      'Notice what feels mutual, what feels confusing, and what your heart keeps explaining away.',
  },
  closure: {
    focus: 'acceptance, release, grief, and the shape of moving forward',
    emotionalLens:
      'The reading treats closure as something you practice gently, not a single answer someone else must give you.',
    caution:
      'Waiting for perfect understanding may keep you tied to a door that is already asking to close.',
    practice:
      'Honor what mattered, then choose one small act that returns your energy to your own life.',
  },
  dailyLoveCard: {
    focus: 'the emotional weather around your heart today',
    emotionalLens:
      'This is a soft daily check-in rather than a prediction. The card reflects what may need attention, care, or restraint today.',
    caution: 'Do not force a major decision from a passing emotional wave.',
    practice: 'Move through the day with one clear intention and one kind boundary.',
  },
};

const QUESTION_CUES: Array<{ patterns: string[]; cue: QuestionCue }> = [
  {
    patterns: ['text', 'message', 'contact', 'reach out', 'call', 'reply', 'dm'],
    cue: {
      key: 'contact',
      theme: 'contact and timing',
      gentlePrompt:
        'Before reaching out, the reading asks you to separate the wish for closeness from the need for immediate relief.',
    },
  },
  {
    patterns: ['feeling', 'feel', 'miss', 'think of me', 'thinking', 'care'],
    cue: {
      key: 'feelings',
      theme: 'their feelings and what can be known',
      gentlePrompt:
        'The cards can reflect the emotional climate, but they also remind you not to treat silence or distance as a complete confession.',
    },
  },
  {
    patterns: ['move on', 'let go', 'closure', 'over', 'release'],
    cue: {
      key: 'closure',
      theme: 'letting go',
      gentlePrompt:
        'This question carries a tender threshold: part of you may already know what peace requires, even if your heart needs time to follow.',
    },
  },
  {
    patterns: ['reconcile', 'come back', 'return', 'together again', 'ex'],
    cue: {
      key: 'reconciliation',
      theme: 'reconciliation and changed behavior',
      gentlePrompt:
        'The reading looks for signs of maturity and repair rather than only the pull of the past.',
    },
  },
  {
    patterns: ['love', 'relationship', 'connection', 'future', 'where is this going'],
    cue: {
      key: 'direction',
      theme: 'relationship direction',
      gentlePrompt:
        'The cards may suggest where the connection has energy, where it lacks clarity, and what you can choose without forcing an outcome.',
    },
  },
];

const OPENING_LINES = [
  'This reading has a quiet, reflective tone.',
  'The spread feels less like a prediction and more like a mirror.',
  'The cards answer softly here, with emphasis on emotional steadiness.',
  'There is a gentle but honest message running through this reading.',
];

const CONNECTION_LINES = [
  'Taken together, the cards describe a movement from {first} into {middle}, with {last} shaping the next wise step.',
  'The story of the spread begins in {first}, moves through {middle}, and asks you to respond from {last}.',
  'As a sequence, these cards move from {first} toward {middle}, then point to {last}.',
  'The cards do not stand alone here: {first} colors the beginning, {middle} shows the emotional center, and {last} offers the practical doorway forward.',
];

const FINAL_ADVICE_LINES = [
  'Let the next step be calm enough that you can respect it tomorrow.',
  'Choose the action that protects your peace, not only the one that chases an answer.',
  'Move slowly enough to hear the difference between intuition and urgency.',
  "Let clarity come through patterns, behavior, and your body's sense of ease.",
];

export function generateMockReading(
  question: string,
  readingType: ReadingTypeId,
  cards: DrawnCard[],
): string {
  const type = getReadingTypeMeta(readingType).title;
  const guidance = READING_GUIDANCE[readingType];
  const cue = getQuestionCue(question);
  const openingLine = pickStable(OPENING_LINES, question, cards, 1);
  const finalLine = pickStable(FINAL_ADVICE_LINES, question, cards, 7);

  const intro =
    `${openingLine} For your ${type} reading, the focus is ${guidance.focus}. ` +
    `Your question is: ${formatQuotedQuestion(question)} ${cue.gentlePrompt}`;

  const cardSection =
    cards.length === 1
      ? buildOneCardSection(cards[0], question, readingType)
      : buildThreeCardSection(cards, question, readingType);

  const synthesis =
    cards.length === 1
      ? buildOneCardSynthesis(cards[0], guidance)
      : buildThreeCardSynthesis(cards, question, readingType, guidance);

  const reversalNote = buildReversalNote(cards);

  const finalAdvice =
    `Final advice: ${guidance.practice} ${finalLine} ` +
    'This reading does not promise a fixed outcome; it may be a sign to stay close to what is steady, honest, and kind to you.';

  return `${intro}\n\n${guidance.emotionalLens}\n\n${cardSection}\n\n${synthesis}\n\n${reversalNote}\n\n${finalAdvice}`;
}

function buildOneCardSection(
  drawnCard: DrawnCard,
  question: string,
  readingType: ReadingTypeId,
): string {
  const meaning = cleanSentence(getCardMeaning(drawnCard).toLowerCase());
  const context = getCardRelationshipCue(drawnCard, question, readingType, 0);

  return (
    `${drawnCard.position}: ${drawnCard.card.name} (${drawnCard.orientation})\n` +
    `This card may suggest ${meaning}. ${context}`
  );
}

function buildThreeCardSection(
  cards: DrawnCard[],
  question: string,
  readingType: ReadingTypeId,
): string {
  return cards
    .map((drawnCard, index) => {
      const meaning = getCardMeaning(drawnCard);
      const cue = getCardRelationshipCue(drawnCard, question, readingType, index);
      const lead = getCardLead(index);

      return (
        `${drawnCard.position}: ${drawnCard.card.name} (${drawnCard.orientation})\n` +
        `${lead} ${meaning} ${cue}`
      );
    })
    .join('\n\n');
}

function buildOneCardSynthesis(drawnCard: DrawnCard, guidance: ReadingTypeGuidance): string {
  const cardTone = getCardTone(drawnCard);

  return (
    `The heart of the reading is ${cardTone}. ` +
    `${drawnCard.card.name} does not ask you to force certainty; it asks you to notice which choice brings you back to self-respect. ` +
    `${guidance.caution}`
  );
}

function buildThreeCardSynthesis(
  cards: DrawnCard[],
  question: string,
  readingType: ReadingTypeId,
  guidance: ReadingTypeGuidance,
): string {
  const [firstCard, middleCard, lastCard] = cards;
  const template = pickStable(CONNECTION_LINES, question, cards, 3);
  const direction = getReadingTypeSynthesis(readingType);
  const connectionLine = template
    .replace('{first}', getCardToneFragment(firstCard))
    .replace('{middle}', getCardToneFragment(middleCard))
    .replace('{last}', getCardToneFragment(lastCard));

  return `${connectionLine} ${direction} ${guidance.caution}`;
}

function buildReversalNote(cards: DrawnCard[]): string {
  const reversedCards = cards.filter((drawnCard) => drawnCard.orientation === 'reversed');

  if (reversedCards.length === 0) {
    return 'With the cards upright, the message comes through fairly directly. The cards point toward clarity through calm observation rather than pressure.';
  }

  const names = reversedCards.map((drawnCard) => drawnCard.card.name).join(', ');

  return `${names} reversed may point toward blocked expression, mixed timing, or an inner truth that needs more gentleness before it becomes action. A reversal here is not a bad omen; it is a request to slow down and listen more carefully.`;
}

function getCardMeaning(drawnCard: DrawnCard): string {
  return drawnCard.orientation === 'upright'
    ? drawnCard.card.uprightMeaning
    : drawnCard.card.reversedMeaning;
}

function getCardTone(drawnCard: DrawnCard): string {
  const meaning = cleanSentence(getCardMeaning(drawnCard).toLowerCase());
  return `${drawnCard.card.name} ${drawnCard.orientation}, which brings in ${meaning}`;
}

function getCardToneFragment(drawnCard: DrawnCard): string {
  const meaning = cleanSentence(getCardMeaning(drawnCard).toLowerCase());
  const verb = drawnCard.orientation === 'reversed' ? 'reflecting' : 'carrying';

  return `${drawnCard.card.name} ${drawnCard.orientation}, ${verb} ${meaning}`;
}

function getCardLead(index: number): string {
  const leads = [
    'This position may describe the emotional ground beneath the question.',
    'At the center of the spread, the card speaks to what is active now.',
    'For the next step, this card offers a practical emotional direction.',
  ];

  return leads[index] ?? 'This card adds another layer to the reading.';
}

function getCardRelationshipCue(
  drawnCard: DrawnCard,
  question: string,
  readingType: ReadingTypeId,
  index: number,
): string {
  const cue = getQuestionCue(question);
  const card = drawnCard.card;
  const loveMeaning = cleanSentence(card.loveMeaning.toLowerCase());

  if (drawnCard.orientation === 'reversed') {
    return getReversedContext(readingType, cue.key, index);
  }

  return getUprightContext(readingType, cue.key, loveMeaning, index);
}

function getQuestionCue(question: string): QuestionCue {
  const normalizedQuestion = question.toLowerCase();
  const match = QUESTION_CUES.find(({ patterns }) =>
    patterns.some((pattern) => normalizedQuestion.includes(pattern)),
  );

  return (
    match?.cue ?? {
      key: 'clarity',
      theme: 'emotional clarity',
      gentlePrompt:
        'The cards may not give a final answer, but they can help you see what your heart is asking to be treated with more honesty.',
    }
  );
}

function getUprightContext(
  readingType: ReadingTypeId,
  cueKey: QuestionKey,
  loveMeaning: string,
  index: number,
): string {
  if (readingType === 'loveClarity') {
    const contexts = [
      'For Love Clarity, this may highlight what feels mutual, what feels confusing, and where emotional safety needs to be felt through action.',
      'This points toward emotional availability: notice whether the connection offers steadiness, not only intensity.',
      'The card may show where clarity becomes possible when you stop filling in the blanks for the other person.',
    ];
    return contexts[index] ?? contexts[0];
  }

  if (readingType === 'closure' || cueKey === 'closure') {
    const contexts = [
      'In this context, it may show what your heart is ready to understand before it loosens its grip on the old story.',
      'This may be a sign to let peace matter more than one last explanation.',
      'The card points toward a gentler ending: one that honors what happened without requiring you to stay inside it.',
    ];
    return contexts[index] ?? contexts[0];
  }

  if (readingType === 'noContact' || cueKey === 'contact') {
    const contexts = [
      'For contact and timing, this may ask you to notice whether reaching out would come from steadiness or from a sudden ache.',
      "This card may show what the quiet is revealing about the connection's real emotional rhythm.",
      'The guidance is to let any message come from clarity, not from the need to end discomfort quickly.',
    ];
    return contexts[index] ?? contexts[0];
  }

  if (readingType === 'exReconciliation' || cueKey === 'reconciliation') {
    const contexts = [
      'For reconciliation, this may show whether the old pattern has softened or is simply asking to be repeated.',
      'This points toward accountability: repair needs changed behavior, not only a familiar pull.',
      'The card may suggest a next step that protects your dignity while leaving room for truth.',
    ];
    return contexts[index] ?? contexts[0];
  }

  return `In relationship matters, this may show ${loveMeaning}.`;
}

function getReversedContext(
  readingType: ReadingTypeId,
  cueKey: QuestionKey,
  index: number,
): string {
  if (readingType === 'loveClarity') {
    const contexts = [
      'For Love Clarity, the reversal may point to mixed signals or emotional availability that has not become consistent yet.',
      'This suggests a place where attraction may be present, but clarity is still uneven.',
      'The card asks you to watch behavior closely instead of trying to solve uncertainty by guessing.',
    ];
    return contexts[index] ?? contexts[0];
  }

  if (readingType === 'closure' || cueKey === 'closure') {
    const contexts = [
      'The reversal may show the part of you that is still negotiating with an ending or waiting for a softer explanation.',
      'This suggests letting go may need more tenderness, not more pressure.',
      'The next step may be less about forcing closure and more about choosing one small act of return to yourself.',
    ];
    return contexts[index] ?? contexts[0];
  }

  if (readingType === 'noContact' || cueKey === 'contact') {
    const contexts = [
      'The reversal may show urgency, anxiety, or a message that wants to be sent before the heart has settled.',
      'This suggests the quiet may feel uncomfortable because something is still emotionally unfinished.',
      'The card advises restraint until your reason for contact feels clear and self-respecting.',
    ];
    return contexts[index] ?? contexts[0];
  }

  if (readingType === 'exReconciliation' || cueKey === 'reconciliation') {
    const contexts = [
      'The reversal may show old hurt, uneven accountability, or a repair that is not yet fully grounded.',
      'This suggests the past still has a voice, but it may not be the whole truth of what is possible now.',
      'The card asks for proof of change before the heart reopens completely.',
    ];
    return contexts[index] ?? contexts[0];
  }

  return 'The reversal may point to delayed expression, mixed timing, or a feeling that is not ready to become action yet.';
}

function getReadingTypeSynthesis(readingType: ReadingTypeId): string {
  const syntheses: Record<ReadingTypeId, string> = {
    noContact:
      'This could indicate that the wisest movement is not immediate contact, but a steadier understanding of what the silence is showing you.',
    exReconciliation:
      'This could indicate that the question is less about whether the past still matters and more about whether both people can meet it with new honesty.',
    loveClarity:
      'This could indicate that clarity will come through mutual effort, emotional availability, and behavior that feels safe enough to trust.',
    closure:
      'This could indicate that peace may arrive gradually, through acceptance and small choices that return your energy to yourself.',
    dailyLoveCard:
      'This could indicate that today asks for gentle attention, honest pacing, and one simple choice that keeps your heart steady.',
  };

  return syntheses[readingType];
}

function cleanSentence(value: string): string {
  return value.trim().replace(/[.!?]+$/u, '');
}

function formatQuotedQuestion(question: string): string {
  const trimmedQuestion = question.trim();
  const ending = /[.!?]$/u.test(trimmedQuestion) ? '' : '.';

  return `"${trimmedQuestion}"${ending}`;
}

function pickStable<T>(options: T[], question: string, cards: DrawnCard[], salt: number): T {
  const seed = cards.reduce(
    (total, drawnCard, index) =>
      total + drawnCard.card.id.length * (index + 1) + drawnCard.position.length,
    question.length + salt,
  );

  return options[seed % options.length];
}
