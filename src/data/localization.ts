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
  common: {
    back: string;
    close: string;
  };
};

export const STRINGS: Record<Language, LocalizedStrings> = {
  en: {
    home: {
      eyebrow: 'Moonlit guidance',
      title: 'Moonlit Tarot',
      subtitle: 'A quiet tarot journal for daily guidance, love, no contact, and emotional clarity.',
      ritualLine: 'Pull a card, name what you are carrying, and leave with a little more steadiness.',
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
      subtitle: 'Pick the lens that fits what you want to understand today.',
      labels: {
        dailyFortune: 'Daily Fortune',
        noContact: 'No Contact',
        exReconciliation: 'Ex / Reconciliation',
        loveClarity: 'Love Clarity',
        closure: 'Closure',
        dailyLoveCard: 'Daily Love Card',
      },
      descriptions: {
        dailyFortune: 'For the overall flow of your day, what to watch, and one practical step.',
        noContact: 'For silence, waiting, restraint, and the urge to reach out.',
        exReconciliation: 'For past love, repair, longing, and honest timing.',
        loveClarity: 'For mixed signals, tender hope, and relationship direction.',
        closure: 'For acceptance, release, grief, and a softer way forward.',
        dailyLoveCard: 'A one-card message for your heart today.',
      },
    },
    question: {
      title: 'Ask the Moon',
      subtitle: 'Write the question you want to hold gently.',
      placeholder: 'Should I text them?\nWhat are they feeling?\nIs it time to move on?',
      dailyFortunePlaceholder: 'What should I focus on today?\nWhat should I watch out for?\nWhat small step would help me?',
      oneCard: '1 Card',
      threeCards: '3 Cards',
      begin: 'Draw Cards',
      defaultDailyQuestion: 'What message does love have for me today?',
      defaultDailyFortuneQuestion: 'What should I know about today?',
      emptyQuestion: 'What am I ready to understand right now?',
    },
    draw: {
      title: 'Draw Your Cards',
      subtitle: 'Breathe once. Tap each card when you are ready to see it.',
      revealHint: 'Reveal',
      continue: 'Read Interpretation',
    },
    result: {
      title: 'Your Reading',
      question: 'Question',
      cards: 'Drawn Cards',
      interpretation: 'Moonlit Reflection',
      save: 'Save to Journal',
      saved: 'Saved to Journal',
      newReading: 'New Reading',
      upright: 'Upright',
      reversed: 'Reversed',
      advice: 'Advice',
    },
    journal: {
      title: 'Journal',
      subtitle: 'Saved readings for reflection, pattern-spotting, and gentle clarity.',
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
    common: {
      back: 'Back',
      close: 'Close',
    },
  },
  ko: {
    home: {
      eyebrow: '달빛 아래 조용한 타로',
      title: 'Moonlit Tarot',
      subtitle: '오늘의 운세와 사랑, 연락운, 마음의 흐름을 차분히 들여다보는 타로 기록장.',
      ritualLine: '카드를 한 장 뽑고, 지금 마음에 걸린 일을 조용히 바라보세요.',
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
      title: '리딩 선택',
      subtitle: '지금 알고 싶은 흐름에 가장 가까운 리딩을 골라보세요.',
      labels: {
        dailyFortune: '오늘의 생활운',
        noContact: '연락운',
        exReconciliation: '재회운',
        loveClarity: '상대의 속마음',
        closure: '마음 정리',
        dailyLoveCard: '오늘의 연애운',
      },
      descriptions: {
        dailyFortune: '오늘의 전체 흐름, 조심할 점, 작은 실천 조언을 봅니다.',
        noContact: '연락이 없는 상황, 기다림, 먼저 연락하고 싶은 마음을 살펴봐요.',
        exReconciliation: '지난 인연, 다시 이어질 가능성, 달라진 흐름을 차분히 봅니다.',
        loveClarity: '상대의 마음, 애매한 신호, 관계의 방향을 확인해요.',
        closure: '놓아야 할 마음, 미련, 정리와 회복의 방향을 봅니다.',
        dailyLoveCard: '오늘 사랑과 감정의 분위기를 한 장으로 확인해요.',
      },
    },
    question: {
      title: '마음속 질문 적기',
      subtitle: '지금 가장 궁금한 마음을 편하게 적어보세요.',
      placeholder: '먼저 연락해도 될까?\n상대는 어떤 마음일까?\n이제 마음을 정리해야 할까?',
      dailyFortunePlaceholder: '오늘 무엇에 집중하면 좋을까?\n조심해야 할 흐름은 무엇일까?\n작게 실천하면 좋은 일은 무엇일까?',
      oneCard: '1장',
      threeCards: '3장',
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
      subtitle: '다시 보고 싶은 리딩과 마음의 흐름을 차곡차곡 남겨두세요.',
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
    common: {
      back: '뒤로',
      close: '닫기',
    },
  },
};
