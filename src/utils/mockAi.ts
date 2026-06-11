import { getReadingTypeMeta } from '../data/readingTypes';
import { STRINGS } from '../data/localization';
import { getKoreanDailyFortuneCopy, getLocalizedCardName } from '../data/cardCopy';
import type { DrawnCard, Language, ReadingTypeId } from '../types';

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
  dailyFortune: {
    focus: "today's overall flow, mood, timing, and one useful next step",
    emotionalLens:
      'This is a grounded daily check-in rather than a fixed prediction. The card reflects the kind of energy that may be easiest to work with today.',
    caution: 'Small delays, mood shifts, or unclear timing do not need to become a full story.',
    practice:
      'Choose one practical action that makes the day feel lighter, cleaner, or easier to move through.',
  },
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

const KOREAN_GUIDANCE: Record<
  ReadingTypeId,
  { focus: string; watch: string; practice: string; closing: string }
> = {
  dailyFortune: {
    focus: '오늘의 전체 흐름과 컨디션, 타이밍을 가볍게 살펴봅니다.',
    watch: '작은 변수나 기분의 흔들림을 너무 큰 신호로 단정하지 않는 것이 좋아요.',
    practice: '오늘은 해야 할 일을 하나만 분명히 정하고, 무리한 속도보다 안정감을 먼저 챙겨보세요.',
    closing: '오늘의 운은 정해진 결과가 아니라, 지금의 흐름을 더 잘 타기 위한 작은 안내에 가깝습니다.',
  },
  noContact: {
    focus: '연락이 없는 상황에서 마음이 어디로 흔들리는지 살펴봅니다.',
    watch: '불안해서 보내는 연락은 잠깐 편해질 수 있지만, 다시 마음을 어지럽힐 수도 있어요.',
    practice: '연락을 하기 전, 지금 필요한 것이 진짜 대화인지 불안을 잠재우는 일인지 먼저 구분해보세요.',
    closing: '카드는 단정적인 답보다, 스스로의 평정을 지키는 쪽을 조용히 비춰줍니다.',
  },
  exReconciliation: {
    focus: '지난 인연의 여운, 달라진 점, 다시 이어질 수 있는 흐름을 차분히 봅니다.',
    watch: '그리움만으로는 같은 패턴을 다르게 만들기 어렵습니다.',
    practice: '상대의 말보다 달라진 행동, 책임감, 꾸준함을 천천히 확인해보세요.',
    closing: '재회운은 확답이 아니라, 과거를 다시 선택해도 괜찮은 흐름인지 살피는 과정입니다.',
  },
  loveClarity: {
    focus: '상대의 속마음, 애매한 신호, 관계의 안정감을 중심으로 봅니다.',
    watch: '아직 확인되지 않은 부분을 마음속에서 너무 빨리 결론 내리지 않는 것이 좋아요.',
    practice: '끌림보다 일관성, 말보다 행동, 설렘보다 편안함을 함께 살펴보세요.',
    closing: '이 리딩은 관계의 정답보다, 지금 마음이 안전하게 머물 수 있는지를 비춰줍니다.',
  },
  closure: {
    focus: '미련, 정리, 받아들임, 다시 나에게 돌아오는 흐름을 살펴봅니다.',
    watch: '완벽한 설명을 기다리다 보면 마음이 같은 자리에 오래 묶일 수 있어요.',
    practice: '오늘은 끝을 밀어붙이기보다, 나를 조금 덜 아프게 하는 선택 하나를 해보세요.',
    closing: '마음 정리는 한 번에 끝나는 결론이 아니라, 조금씩 나에게 돌아오는 과정입니다.',
  },
  dailyLoveCard: {
    focus: '오늘 사랑과 감정의 분위기, 마음의 온도, 조심할 지점을 봅니다.',
    watch: '하루의 감정 기복을 관계 전체의 결론처럼 받아들이지 않는 것이 좋아요.',
    practice: '오늘은 마음을 다그치기보다, 표현할 것과 지켜야 할 선을 부드럽게 구분해보세요.',
    closing: '오늘의 연애운은 미래를 확정하기보다, 마음을 더 잘 돌보기 위한 작은 신호입니다.',
  },
};

export function generateMockReading(
  question: string,
  readingType: ReadingTypeId,
  cards: DrawnCard[],
  language: Language = 'en',
): string {
  if (language === 'ko') {
    if (readingType === 'dailyFortune') {
      return generateKoreanDailyFortuneReading(cards);
    }

    return generateKoreanReading(question, readingType, cards);
  }

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
      ? buildOneCardSynthesis(cards[0], readingType, guidance)
      : buildThreeCardSynthesis(cards, question, readingType, guidance);

  const reversalNote = buildReversalNote(cards);

  const finalAdvice =
    `Final advice: ${guidance.practice} ${finalLine} ` +
    'This reading does not promise a fixed outcome; it may be a sign to stay close to what is steady, honest, and kind to you.';

  return `${intro}\n\n${guidance.emotionalLens}\n\n${cardSection}\n\n${synthesis}\n\n${reversalNote}\n\n${finalAdvice}`;
}

export function generateKoreanDailyFortuneReading(cards: DrawnCard[]): string {
  const [flowCard, watchCard = flowCard, adviceCard = flowCard] = cards;
  const flowCopy = getKoreanDailyFortuneCopy(flowCard.card.id);
  const watchCopy = getKoreanDailyFortuneCopy(watchCard.card.id);
  const adviceCopy = getKoreanDailyFortuneCopy(adviceCard.card.id);
  const flowName = getLocalizedCardName(flowCard.card, 'ko');
  const orientationNote = flowCard.orientation === 'reversed' ? ' 역방향으로' : '';

  return (
    `오늘의 흐름\n` +
    `${flowName} 카드가${orientationNote} 오늘의 중심에 놓였습니다. ${flowCopy.flow}\n\n` +
    `조심할 점\n` +
    `${watchCopy.watch}\n\n` +
    `작은 조언\n` +
    `${adviceCopy.advice}\n\n` +
    `달빛 아래 한마디\n` +
    `${adviceCopy.closing}`
  );
}

function generateKoreanReading(
  question: string,
  readingType: ReadingTypeId,
  cards: DrawnCard[],
): string {
  const label = STRINGS.ko.readingTypes.labels[readingType];
  const guidance = KOREAN_GUIDANCE[readingType];
  const questionLine = question.trim() ? `질문: "${question.trim()}"` : '오늘의 흐름을 중심으로 봅니다.';
  const cardSection = cards
    .map((drawnCard, index) => {
      const orientation = drawnCard.orientation === 'upright' ? '정방향' : '역방향';
      const cardName = getLocalizedCardName(drawnCard.card, 'ko');
      return (
        `${drawnCard.position}: ${cardName} (${orientation})\n` +
        `${getKoreanCardCue(drawnCard, readingType, index)}`
      );
    })
    .join('\n\n');
  const synthesis =
    cards.length === 1
      ? getKoreanOneCardSynthesis(cards[0], readingType)
      : getKoreanThreeCardSynthesis(cards, readingType);

  return (
    `${label} 리딩입니다. ${questionLine}\n\n` +
    `${guidance.focus}\n\n` +
    `${cardSection}\n\n` +
    `${synthesis}\n\n` +
    `조심할 점: ${guidance.watch}\n\n` +
    `작은 조언: ${guidance.practice} ${guidance.closing}`
  );
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

function getKoreanCardCue(
  drawnCard: DrawnCard,
  readingType: ReadingTypeId,
  index: number,
): string {
  if (readingType === 'dailyFortune') {
    const upright = [
      '오늘의 흐름은 비교적 자연스럽게 열릴 수 있습니다. 큰 결정보다는 작은 선택을 또렷하게 하는 데 도움이 되는 카드예요.',
      '오늘은 주변 분위기와 타이밍을 살피면 일이 조금 더 부드럽게 풀릴 수 있습니다.',
      '지금 할 수 있는 작은 정리나 실천이 하루의 리듬을 안정시켜줄 수 있어요.',
    ];
    const reversed = [
      '오늘은 서두르기보다 속도를 낮추라는 신호일 수 있습니다. 컨디션과 마음의 여유를 먼저 확인해보세요.',
      '예상과 다른 흐름이 있어도 곧바로 나쁜 징조로 볼 필요는 없습니다. 확인하고 조정하는 태도가 중요해요.',
      '완벽하게 해내려는 마음보다, 한 가지를 차분히 마무리하는 쪽이 더 유리해 보입니다.',
    ];
    return drawnCard.orientation === 'upright'
      ? upright[index] ?? upright[0]
      : reversed[index] ?? reversed[0];
  }

  const upright = [
    '이 카드는 마음의 흐름이 비교적 선명하게 드러나는 지점을 보여줍니다.',
    '지금 관계 안에서 실제로 움직이고 있는 감정과 태도를 살펴보게 합니다.',
    '다음 선택은 감정보다 안정감과 존중을 기준으로 삼으라는 조언에 가깝습니다.',
  ];
  const reversed = [
    '역방향은 아직 막혀 있거나 말로 다 정리되지 않은 마음을 보여줄 수 있어요.',
    '상대나 상황을 너무 빨리 단정하기보다, 반복되는 행동을 천천히 확인하는 편이 좋습니다.',
    '지금은 밀어붙이기보다 마음을 가라앉히고 나를 지키는 선택이 더 중요해 보입니다.',
  ];

  return drawnCard.orientation === 'upright'
    ? upright[index] ?? upright[0]
    : reversed[index] ?? reversed[0];
}

function getKoreanOneCardSynthesis(drawnCard: DrawnCard, readingType: ReadingTypeId): string {
  const cardName = getLocalizedCardName(drawnCard.card, 'ko');

  if (readingType === 'dailyLoveCard') {
    return `${cardName} 카드는 오늘의 감정 흐름을 부드럽게 비춰줍니다. 큰 결론을 서두르기보다, 마음이 편안해지는 방향을 먼저 살펴보세요.`;
  }

  return `${cardName} 카드는 지금 가장 크게 보아야 할 마음의 흐름을 보여줍니다. 확정적인 답을 찾기보다, 나를 불안하게 만드는 지점과 편안하게 하는 지점을 함께 보세요.`;
}

function getKoreanThreeCardSynthesis(cards: DrawnCard[], readingType: ReadingTypeId): string {
  const [firstCard, middleCard, lastCard] = cards;
  const firstName = getLocalizedCardName(firstCard.card, 'ko');
  const middleName = getLocalizedCardName(middleCard.card, 'ko');
  const lastName = getLocalizedCardName(lastCard.card, 'ko');

  return `${firstName}은 지난 흐름을, ${middleName}은 지금의 감정 중심을, ${lastName}은 다음 선택의 방향을 보여줍니다. 세 카드는 한 가지 결론보다, 마음을 더 안전하게 다루는 방법을 함께 말하고 있습니다.`;
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

function buildOneCardSynthesis(
  drawnCard: DrawnCard,
  readingType: ReadingTypeId,
  guidance: ReadingTypeGuidance,
): string {
  const cardTone = getCardTone(drawnCard);

  if (readingType === 'dailyFortune') {
    return (
      `The center of today's fortune is ${cardTone}. ` +
      `${drawnCard.card.name} does not ask you to force the day; it asks you to move with timing, attention, and one steady choice. ` +
      `${guidance.caution}`
    );
  }

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
  if (readingType === 'dailyFortune') {
    const contexts = [
      "For Daily Fortune, this may highlight the day's main rhythm and where your attention can be most useful.",
      'This points toward what to watch in your mood, timing, or practical choices today.',
      'The card may show a small step that helps the day feel more grounded and manageable.',
    ];
    return contexts[index] ?? contexts[0];
  }

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
  if (readingType === 'dailyFortune') {
    const contexts = [
      'For Daily Fortune, the reversal may point to a small delay, low energy, or a place where the day asks for gentler pacing.',
      'This suggests you may need to check assumptions before moving quickly.',
      'The card advises one simple adjustment rather than forcing the day to unfold perfectly.',
    ];
    return contexts[index] ?? contexts[0];
  }

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
    dailyFortune:
      'This could indicate that today is best approached through practical awareness, flexible timing, and one small choice that supports your energy.',
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
