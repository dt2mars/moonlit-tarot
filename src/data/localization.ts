import type { Language, ReadingTypeId } from '../types';

type LocalizedStrings = {
  home: {
    title: string;
    subtitle: string;
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
      title: 'Moonlit Tarot',
      subtitle: 'A quiet tarot journal for love, no contact, and emotional clarity.',
      dailyCard: 'Daily Card',
      startReading: 'Start Relationship Reading',
      journal: 'Journal / History',
      settings: 'Settings',
    },
    readingTypes: {
      title: 'Choose a Reading',
      subtitle: 'Select the emotional lens for tonight.',
      labels: {
        noContact: 'No Contact',
        exReconciliation: 'Ex / Reconciliation',
        loveClarity: 'Love Clarity',
        closure: 'Closure',
        dailyLoveCard: 'Daily Love Card',
      },
      descriptions: {
        noContact: 'Silence, waiting, restraint, and emotional distance.',
        exReconciliation: 'Past connections, repair, longing, and honest timing.',
        loveClarity: 'Mixed signals, new feelings, and relationship direction.',
        closure: 'Acceptance, release, grief, and moving forward gently.',
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
      subtitle: 'Tap each card when you are ready.',
      revealHint: 'Tap to reveal',
      continue: 'Read Interpretation',
    },
    result: {
      title: 'Reading',
      question: 'Question',
      cards: 'Cards',
      interpretation: 'Interpretation',
      save: 'Save to Journal',
      saved: 'Saved',
      newReading: 'New Reading',
      upright: 'Upright',
      reversed: 'Reversed',
      advice: 'Advice',
    },
    journal: {
      title: 'Journal',
      subtitle: 'Saved readings for reflection and closure.',
      empty: 'No saved readings yet.',
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
      title: 'Moonlit Tarot',
      subtitle: '사랑, 노컨택, 감정의 명료함을 위한 조용한 타로 저널.',
      dailyCard: '오늘의 카드',
      startReading: '관계 리딩 시작',
      journal: '저널 / 기록',
      settings: '설정',
    },
    readingTypes: {
      title: '리딩 선택',
      subtitle: '오늘 밤 마음에 맞는 주제를 골라보세요.',
      labels: {
        noContact: '노컨택',
        exReconciliation: '전 연인 / 재회',
        loveClarity: '사랑의 명료함',
        closure: '마무리',
        dailyLoveCard: '오늘의 러브 카드',
      },
      descriptions: {
        noContact: '침묵, 기다림, 절제, 감정적 거리두기.',
        exReconciliation: '지난 관계, 회복, 그리움, 솔직한 타이밍.',
        loveClarity: '애매한 신호, 새로운 감정, 관계의 방향.',
        closure: '수용, 놓아주기, 슬픔, 부드러운 전진.',
        dailyLoveCard: '오늘 마음을 위한 한 장의 메시지.',
      },
    },
    question: {
      title: '달에게 묻기',
      subtitle: '마음속 질문을 조용히 적어보세요.',
      placeholder: '문자를 보내도 될까?\n그 사람은 무엇을 느낄까?\n이제 놓아줄 때일까?',
      oneCard: '1장',
      threeCards: '3장',
      begin: '카드 뽑기',
      defaultDailyQuestion: '오늘 사랑이 내게 전하는 메시지는 무엇일까?',
      emptyQuestion: '이 관계에서 내가 이해할 준비가 된 것은 무엇일까?',
    },
    draw: {
      title: '카드 뽑기',
      subtitle: '준비되면 카드를 눌러 펼쳐보세요.',
      revealHint: '눌러서 보기',
      continue: '해석 보기',
    },
    result: {
      title: '리딩',
      question: '질문',
      cards: '카드',
      interpretation: '해석',
      save: '저널에 저장',
      saved: '저장됨',
      newReading: '새 리딩',
      upright: '정방향',
      reversed: '역방향',
      advice: '조언',
    },
    journal: {
      title: '저널',
      subtitle: '성찰과 마무리를 위해 저장한 리딩.',
      empty: '아직 저장된 리딩이 없습니다.',
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
