import type { Language, ReadingTypeId } from '../types';

type LocalizedStrings = {
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ritualLine: string;
    dailyCard: string;
    startReading: string;
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
    oneCard: string;
    threeCards: string;
    begin: string;
    defaultDailyQuestion: string;
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
      eyebrow: 'Love clarity under moonlight',
      title: 'Moonlit Tarot',
      subtitle: 'A quiet tarot journal for love, no contact, and emotional clarity.',
      ritualLine: 'Pull a card, name the ache, and leave with a little more peace.',
      dailyCard: 'Daily Love Card',
      startReading: 'Start Relationship Reading',
      journal: 'Open Journal',
      settings: 'Settings',
    },
    readingTypes: {
      title: 'Choose a Reading',
      subtitle: 'Pick the emotional lens that fits what your heart is holding tonight.',
      labels: {
        noContact: 'No Contact',
        exReconciliation: 'Ex / Reconciliation',
        loveClarity: 'Love Clarity',
        closure: 'Closure',
        dailyLoveCard: 'Daily Love Card',
      },
      descriptions: {
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
      oneCard: '1 Card',
      threeCards: '3 Cards',
      begin: 'Draw Cards',
      defaultDailyQuestion: 'What message does love have for me today?',
      emptyQuestion: 'What am I ready to understand about this connection?',
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
      subtitle: 'Saved readings for reflection, pattern-spotting, and closure.',
      emptyTitle: 'Your journal is quiet tonight.',
      empty: 'Save a reading when something feels worth returning to.',
      delete: 'Delete',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      english: 'English',
      korean: 'Korean',
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
      eyebrow: '달빛 아래에서 찾는 사랑의 명료함',
      title: 'Moonlit Tarot',
      subtitle: '사랑, 노컨택, 감정 정리를 위한 조용한 타로 저널.',
      ritualLine: '카드를 뽑고, 마음의 결을 바라보고, 조금 더 평온하게 돌아가세요.',
      dailyCard: '오늘의 러브 카드',
      startReading: '관계 리딩 시작하기',
      journal: '저널 열기',
      settings: '설정',
    },
    readingTypes: {
      title: '리딩 선택',
      subtitle: '오늘 밤 마음이 붙잡고 있는 감정에 가장 가까운 주제를 골라보세요.',
      labels: {
        noContact: '노컨택',
        exReconciliation: '전 연인 / 재회',
        loveClarity: '사랑의 명료함',
        closure: '마무리',
        dailyLoveCard: '오늘의 러브 카드',
      },
      descriptions: {
        noContact: '침묵, 기다림, 연락하고 싶은 마음을 차분히 바라볼 때.',
        exReconciliation: '지난 사랑, 회복 가능성, 그리움과 타이밍을 보고 싶을 때.',
        loveClarity: '애매한 신호, 조심스러운 기대, 관계의 방향이 궁금할 때.',
        closure: '받아들임, 놓아주기, 슬픔 이후의 부드러운 전진을 위해.',
        dailyLoveCard: '오늘 내 마음에 필요한 한 장의 메시지.',
      },
    },
    question: {
      title: '달에게 묻기',
      subtitle: '지금 마음에 남아 있는 질문을 조심스럽게 적어보세요.',
      placeholder: '문자를 보내도 될까?\n그 사람은 무엇을 느끼고 있을까?\n이제 놓아줄 때일까?',
      oneCard: '1장',
      threeCards: '3장',
      begin: '카드 뽑기',
      defaultDailyQuestion: '오늘 사랑이 내게 전하는 메시지는 무엇일까?',
      emptyQuestion: '이 관계에서 지금 내가 이해할 준비가 된 것은 무엇일까?',
    },
    draw: {
      title: '카드 뽑기',
      subtitle: '한 번 숨을 고르고, 준비되면 카드를 눌러 펼쳐보세요.',
      revealHint: '펼치기',
      continue: '해석 보기',
    },
    result: {
      title: '나의 리딩',
      question: '질문',
      cards: '뽑은 카드',
      interpretation: '달빛 해석',
      save: '저널에 저장',
      saved: '저장됨',
      newReading: '새 리딩',
      upright: '정방향',
      reversed: '역방향',
      advice: '조언',
    },
    journal: {
      title: '저널',
      subtitle: '성찰과 패턴 발견, 그리고 마무리를 위해 저장한 리딩.',
      emptyTitle: '오늘 밤 저널은 아직 조용해요.',
      empty: '다시 돌아보고 싶은 리딩이 생기면 저장해두세요.',
      delete: '삭제',
    },
    settings: {
      title: '설정',
      language: '언어',
      english: '영어',
      korean: '한국어',
      disclaimerTitle: '안내',
      disclaimer:
        '이 앱은 오락과 자기 성찰을 위한 것입니다. 의료, 법률, 금융 또는 전문적인 조언을 제공하지 않습니다.',
      version: '앱 버전',
    },
    common: {
      back: '뒤로',
      close: '닫기',
    },
  },
};
