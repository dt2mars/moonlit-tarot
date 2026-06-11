import type { Language, ReadingTypeId } from '../types';

type LocalizedStrings = {
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ritualLine: string;
    todayTitle: string;
    dailyFortune: string;
    dailyFortuneSubtitle: string;
    dailyLoveCard: string;
    dailyLoveSubtitle: string;
    relationshipTitle: string;
    journalTitle: string;
    journal: string;
    settings: string;
  };
  readingTypes: {
    title: string;
    subtitle: string;
    labels: Record<ReadingTypeId, string>;
    descriptions: Record<ReadingTypeId, string>;
  };
  question: {
    title: string;
    subtitle: string;
    placeholder: string;
    dailyFortunePlaceholder: string;
    oneCard: string;
    threeCards: string;
    basicOneCardReading: string;
    begin: string;
    defaultDailyQuestion: string;
    defaultDailyFortuneQuestion: string;
    emptyQuestion: string;
  };
  draw: {
    title: string;
    subtitle: string;
    revealHint: string;
    continue: string;
  };
  result: {
    title: string;
    question: string;
    cards: string;
    interpretation: string;
    save: string;
    saved: string;
    newReading: string;
    upright: string;
    reversed: string;
    advice: string;
  };
  journal: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    empty: string;
    delete: string;
  };
  settings: {
    title: string;
    language: string;
    english: string;
    korean: string;
    disclaimerTitle: string;
    disclaimer: string;
    version: string;
  };
  plus: {
    teaserTitle: string;
    teaserBody: string;
    teaserButton: string;
    homeTeaserBody: string;
    sampleButton: string;
    badge: string;
    title: string;
    subtitle: string;
    freeTitle: string;
    freeBenefits: string[];
    plusTitle: string;
    plusBenefits: string[];
    note: string;
  };
  plusSample: {
    title: string;
    subtitle: string;
    note: string;
    cardsLabel: string;
    positions: {
      current: string;
      hidden: string;
      next: string;
    };
    interpretationTitle: string;
    interpretation: string;
  };
  common: {
    back: string;
    close: string;
  };
};

export const STRINGS: Record<Language, LocalizedStrings> = {
  en: {
    home: {
      eyebrow: 'Quiet guidance under moonlight',
      title: 'Moonlit Tarot',
      subtitle: 'A quiet tarot journal for daily guidance, love, no contact, and emotional clarity.',
      ritualLine: 'Draw a card, name what you are carrying, and leave with one steadier next step.',
      todayTitle: 'Today',
      dailyFortune: 'Daily Fortune',
      dailyFortuneSubtitle: 'A quick card for your day, mood, and timing.',
      dailyLoveCard: 'Daily Love Card',
      dailyLoveSubtitle: "A gentle look at today's emotional energy.",
      relationshipTitle: 'Relationship Reading',
      journalTitle: 'Journal',
      journal: 'Open Journal',
      settings: 'Settings',
    },
    readingTypes: {
      title: 'Choose a Reading',
      subtitle: 'Select the reading that best fits what you want to understand today.',
      labels: {
        dailyFortune: 'Daily Fortune',
        noContact: 'No Contact',
        exReconciliation: 'Ex / Reconciliation',
        loveClarity: 'Love Clarity',
        closure: 'Closure',
        dailyLoveCard: 'Daily Love Card',
      },
      descriptions: {
        dailyFortune: 'A quick card for your day, mood, and timing.',
        noContact: 'For silence, restraint, waiting, and the question of reaching out.',
        exReconciliation: 'For past love, repair, return, and honest timing.',
        loveClarity: 'For mixed signals, emotional availability, and relationship direction.',
        closure: 'For acceptance, release, and a softer way forward.',
        dailyLoveCard: "A gentle look at today's emotional energy.",
      },
    },
    question: {
      title: 'Ask the Moon',
      subtitle: 'Write the question you want to hold with care.',
      placeholder: 'Should I text them?\nWhat are they feeling?\nIs it time to move on?',
      dailyFortunePlaceholder:
        'What should I focus on today?\nWhat should I watch out for?\nWhat small step would help?',
      oneCard: '1 Card',
      threeCards: '3 Cards',
      basicOneCardReading: 'Basic 1-card relationship reading',
      begin: 'Draw Cards',
      defaultDailyQuestion: 'What does my heart need to know about love today?',
      defaultDailyFortuneQuestion: "What should I know about today's flow?",
      emptyQuestion: 'What am I ready to understand right now?',
    },
    draw: {
      title: 'Draw Your Cards',
      subtitle: 'Take one breath. Tap each card when you are ready.',
      revealHint: 'Reveal',
      continue: 'Read Interpretation',
    },
    result: {
      title: 'Your Reading',
      question: 'Question',
      cards: 'Cards Drawn',
      interpretation: 'Moonlit Interpretation',
      save: 'Save to Journal',
      saved: 'Saved to Journal',
      newReading: 'New Reading',
      upright: 'Upright',
      reversed: 'Reversed',
      advice: 'Advice',
    },
    journal: {
      title: 'Journal',
      subtitle: 'Saved readings for reflection, patterns, and quiet clarity.',
      emptyTitle: 'Your journal is quiet tonight.',
      empty: 'Save a reading when something feels worth returning to.',
      delete: 'Delete',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      english: 'English',
      korean: '한국어',
      disclaimerTitle: 'Disclaimer',
      disclaimer:
        'This app is for entertainment and self-reflection only. It does not provide medical, legal, financial, or professional advice.',
      version: 'App version',
    },
    plus: {
      teaserTitle: 'Go deeper with Moonlit Plus',
      teaserBody:
        'When one card is not enough, Plus gives you a deeper 3-card reading.',
      teaserButton: 'Preview Plus',
      homeTeaserBody:
        'When one card is not enough, Plus gives you a deeper 3-card reading.',
      sampleButton: 'Try a 3-card Plus sample',
      badge: 'Coming soon',
      title: 'Moonlit Plus',
      subtitle: 'For deeper readings when one card is not enough.',
      freeTitle: 'Free',
      freeBenefits: [
        '1-card daily readings',
        'Basic tarot interpretation',
        'Journal saving',
        'Basic 1-card relationship reading',
      ],
      plusTitle: 'Plus',
      plusBenefits: [
        'Deeper 3-card spreads',
        'Expanded daily fortune',
        'More detailed love and relationship guidance',
        'Richer journal reflections',
        'Future AI-powered personal readings',
      ],
      note:
        'Payments are not enabled yet. This preview is here to shape the upcoming Plus experience.',
    },
    plusSample: {
      title: 'Moonlit Plus Sample',
      subtitle: 'A deeper 3-card reading preview.',
      note:
        'This is a preview of the deeper 3-card reading experience being prepared for Moonlit Plus.',
      cardsLabel: '3-Card Reading',
      positions: {
        current: 'Current energy',
        hidden: 'Hidden influence',
        next: 'Next guidance',
      },
      interpretationTitle: 'Plus Sample Interpretation',
      interpretation:
        'Current energy — The High Priestess\nThe present energy asks for quiet attention. There may be something you already sense beneath the surface, even if it has not become easy to name. The High Priestess does not push for immediate action; she invites you to trust the part of you that notices patterns before they become clear.\n\nHidden influence — The Moon\nThe hidden influence is uncertainty. When the light is dim, the mind can fill empty spaces with fear, projection, or unfinished stories. The Moon suggests slowing down before treating anxiety as truth, and letting emotional fog settle before choosing your next move.\n\nNext guidance — The Star\nThe next guidance is gentle recovery. The Star does not promise an instant answer, but it points toward steadiness, hope, and a kinder way of returning to yourself. Choose the step that helps you breathe more freely, even if it is small.\n\nMoonlit note\nYou do not have to force every answer into view tonight. A deeper reading begins by listening carefully, waiting for clarity, and letting hope become calm rather than urgent.',
    },
    common: {
      back: 'Back',
      close: 'Close',
    },
  },
  ko: {
    home: {
      eyebrow: '달빛 아래 조용한 리딩',
      title: 'Moonlit Tarot',
      subtitle: '오늘의 운세와 사랑, 연락운, 마음의 흐름을 차분히 들여다보는 타로 기록장.',
      ritualLine: '카드를 한 장 펼치고, 지금 마음에 남아 있는 흐름을 천천히 바라보세요.',
      todayTitle: '오늘의 리딩',
      dailyFortune: '오늘의 생활운',
      dailyFortuneSubtitle: '오늘 하루의 흐름과 조심할 점을 가볍게 확인해요.',
      dailyLoveCard: '오늘의 연애운',
      dailyLoveSubtitle: '오늘 사랑의 분위기와 마음의 방향을 살펴봐요.',
      relationshipTitle: '관계 리딩',
      journalTitle: '기록',
      journal: '기록장 열기',
      settings: '설정',
    },
    readingTypes: {
      title: '리딩 선택하기',
      subtitle: '오늘 살펴보고 싶은 흐름에 맞는 리딩을 골라보세요.',
      labels: {
        dailyFortune: '오늘의 생활운',
        noContact: '연락운',
        exReconciliation: '재회운',
        loveClarity: '상대의 속마음',
        closure: '마음 정리',
        dailyLoveCard: '오늘의 연애운',
      },
      descriptions: {
        dailyFortune: '오늘 하루의 흐름과 조심할 점을 가볍게 확인해요.',
        noContact: '침묵, 기다림, 연락 가능성과 타이밍을 살펴봐요.',
        exReconciliation: '과거의 관계, 다시 이어질 가능성, 회복의 흐름을 살펴봐요.',
        loveClarity: '상대의 마음, 애매한 신호, 관계의 방향을 살펴봐요.',
        closure: '받아들임, 내려놓기, 더 부드러운 다음 걸음을 위한 리딩이에요.',
        dailyLoveCard: '오늘 사랑의 분위기와 마음의 방향을 살펴봐요.',
      },
    },
    question: {
      title: '마음속 질문 적기',
      subtitle: '지금 가장 궁금한 마음을 편하게 적어보세요.',
      placeholder: '먼저 연락해도 될까?\n상대는 어떤 마음일까?\n이제 마음을 정리해야 할까?',
      dailyFortunePlaceholder:
        '오늘 무엇에 집중하면 좋을까?\n조심해야 할 흐름은 무엇일까?\n작게 실천하면 좋은 일은 무엇일까?',
      oneCard: '1장',
      threeCards: '3장',
      basicOneCardReading: '기본 1장 관계 리딩',
      begin: '카드 뽑기',
      defaultDailyQuestion: '오늘 내 연애운은 어떤 흐름일까?',
      defaultDailyFortuneQuestion: '오늘 하루, 내가 알아두면 좋을 흐름은 무엇일까?',
      emptyQuestion: '지금 내가 알아차려야 할 흐름은 무엇일까?',
    },
    draw: {
      title: '카드 뽑기',
      subtitle: '숨을 한 번 고르고, 준비되면 카드를 눌러 펼쳐보세요.',
      revealHint: '펼치기',
      continue: '해석 보기',
    },
    result: {
      title: '나의 리딩',
      question: '질문',
      cards: '뽑은 카드',
      interpretation: '달빛 해석',
      save: '기록장에 저장',
      saved: '기록장에 저장됨',
      newReading: '새 리딩 보기',
      upright: '정방향',
      reversed: '역방향',
      advice: '조언',
    },
    journal: {
      title: '기록장',
      subtitle: '다시 보고 싶은 리딩과 마음의 흐름을 차분히 남겨두세요.',
      emptyTitle: '아직 기록된 리딩이 없어요.',
      empty: '마음에 남는 리딩이 있다면 기록장에 저장해두세요.',
      delete: '삭제',
    },
    settings: {
      title: '설정',
      language: '언어',
      english: 'English',
      korean: '한국어',
      disclaimerTitle: '안내',
      disclaimer:
        '이 앱은 오락과 자기 성찰을 위한 서비스입니다. 의료, 법률, 금융 또는 전문적인 조언을 제공하지 않습니다.',
      version: '앱 버전',
    },
    plus: {
      teaserTitle: '더 깊은 해석이 필요할 때',
      teaserBody:
        '한 장으로는 아쉬울 때, Plus에서는 3장으로 더 깊게 흐름을 살펴볼 수 있어요.',
      teaserButton: 'Plus 미리보기',
      homeTeaserBody: '한 장으로는 아쉬울 때, Plus에서는 3장으로 더 깊게 흐름을 살펴볼 수 있어요.',
      sampleButton: '3장 Plus 샘플 보기',
      badge: '준비 중',
      title: 'Moonlit Plus',
      subtitle: '한 장으로는 부족할 때, 더 깊게 들여다보는 리딩.',
      freeTitle: '무료',
      freeBenefits: [
        '오늘의 1장 리딩',
        '기본 타로 해석',
        '기록장 저장',
        '기본 1장 관계 리딩',
      ],
      plusTitle: 'Moonlit Plus',
      plusBenefits: [
        '3장 확장 리딩',
        '더 깊은 오늘의 운세',
        '더 자세한 오늘의 연애운',
        '관계 흐름 해석',
        '기록장 기반 회고',
        '향후 AI 기반 개인화 해석',
      ],
      note:
        '아직 결제는 연결하지 않았습니다. 이 화면은 앞으로 추가될 Moonlit Plus 경험을 미리 보여주는 안내입니다.',
    },
    plusSample: {
      title: 'Moonlit Plus 샘플',
      subtitle: '더 깊은 3장 리딩을 미리 살펴보세요.',
      note: '이 리딩은 Moonlit Plus에서 준비 중인 3장 확장 리딩의 미리보기입니다.',
      cardsLabel: '3장 리딩',
      positions: {
        current: '현재 흐름',
        hidden: '숨은 영향',
        next: '다음 조언',
      },
      interpretationTitle: 'Plus 샘플 해석',
      interpretation:
        '현재 흐름 — 여사제\n\n지금의 흐름은 겉으로 드러난 상황보다, 마음속에서 조용히 감지되는 신호가 더 중요한 시기입니다. 누군가의 말이나 눈에 보이는 결과보다, 이미 마음 한편에서 느끼고 있었던 감각이 더 정확할 수 있어요.\n\n여사제는 지금 당장 움직이라고 재촉하는 카드가 아닙니다. 오히려 서둘러 답을 정하기 전에, 내 안에서 반복해서 올라오는 느낌을 차분히 바라보라고 말합니다. 말로 설명하기 어렵지만 계속 신경 쓰이는 일, 괜찮다고 넘겼지만 마음에 남아 있는 감정이 있다면 오늘은 그것을 무시하지 않는 편이 좋습니다.\n\n지금은 바깥의 소음보다 내 안의 조용한 확신을 듣는 시간이 필요합니다. 답은 아직 완전히 드러나지 않았지만, 이미 당신은 무엇이 편안한지, 무엇이 어색한지 조금씩 알고 있을 수 있습니다.\n\n숨은 영향 — 달\n\n겉으로는 괜찮아 보이지만, 안쪽에는 불안과 망설임, 아직 확인되지 않은 생각들이 섞여 있을 수 있습니다. 달은 상황이 실제보다 더 크게 느껴지거나, 마음이 빈칸을 스스로의 상상으로 채우기 쉬운 흐름을 보여줍니다.\n\n그래서 지금은 두려움을 곧바로 사실로 받아들이지 않는 것이 중요합니다. 상대의 반응, 일의 흐름, 오늘의 기분이 분명하지 않다고 해서 그것이 반드시 나쁜 방향을 의미하는 것은 아닙니다. 아직 안개가 걷히지 않았을 뿐, 모든 것이 틀어진 것은 아닐 수 있어요.\n\n달은 숨겨진 감정을 드러내는 카드이기도 합니다. 불안한 마음을 억누르기보다, 무엇이 나를 흔들고 있는지 천천히 구분해보세요. 감정과 현실을 나누어 바라보기 시작하면, 막연했던 걱정이 조금씩 이름을 갖게 되고, 이름을 갖게 된 감정은 전보다 다루기 쉬워집니다.\n\n다음 조언 — 별\n\n별은 혼란이 지나간 뒤 다시 마음을 회복하는 빛에 가깝습니다. 지금 필요한 것은 모든 답을 한 번에 찾는 일이 아니라, 스스로를 조금 더 편안하게 만드는 작은 선택입니다. 무리해서 결론을 내리기보다, 오늘의 나를 덜 지치게 하는 방향을 골라보세요.\n\n별은 아직 완성된 결과보다 회복의 가능성을 보여줍니다. 상황이 당장 크게 바뀌지 않더라도, 마음을 정돈하고 숨을 고르는 것만으로도 흐름은 달라질 수 있습니다. 오늘은 누군가에게 증명하려는 선택보다, 내 마음이 다시 안정될 수 있는 선택이 더 중요합니다.\n\n작은 희망은 대단한 확신에서 시작되지 않을 때가 많습니다. 잠시 멈추고, 불필요한 걱정을 내려놓고, 내가 할 수 있는 가장 부드러운 행동 하나를 고르는 것. 그것만으로도 다음 흐름은 조금 더 선명해질 수 있습니다.\n\n달빛 아래 한마디\n\n지금은 억지로 답을 끌어내기보다, 마음이 천천히 정리될 시간을 주는 편이 좋습니다. 분명해질 것은 결국 분명해지고, 당신을 오래 흔드는 감정도 차분히 바라보면 조금씩 제자리를 찾을 수 있습니다.',
    },
    common: {
      back: '뒤로',
      close: '닫기',
    },
  },
};
