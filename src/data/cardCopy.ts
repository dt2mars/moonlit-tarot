import type { CardOrientation, DrawnCard, Language, ReadingTypeId, TarotCardData } from '../types';

type DailyFortuneCopy = {
  flow: string;
  watch: string;
  advice: string;
  closing: string;
};

const KOREAN_CARD_NAMES: Record<string, string> = {
  fool: '광대',
  magician: '마법사',
  'high-priestess': '여사제',
  empress: '여황제',
  emperor: '황제',
  hierophant: '교황',
  lovers: '연인',
  chariot: '전차',
  strength: '힘',
  hermit: '은둔자',
  'wheel-of-fortune': '운명의 수레바퀴',
  justice: '정의',
  'hanged-man': '매달린 사람',
  death: '죽음',
  temperance: '절제',
  devil: '악마',
  tower: '탑',
  star: '별',
  moon: '달',
  sun: '태양',
  judgement: '심판',
  world: '세계',
};

const KOREAN_DAILY_FORTUNE: Record<string, DailyFortuneCopy> = {
  fool: {
    flow:
      '오늘은 익숙한 방식에서 살짝 벗어나기 좋은 흐름입니다. 무겁게 계산하기보다 가볍게 시작해보면 생각보다 길이 열릴 수 있어요.',
    watch:
      '새로운 마음이 앞서면 확인해야 할 부분을 놓치기 쉽습니다. 중요한 선택은 한 번 더 살피고 움직이세요.',
    advice:
      '큰 결론보다 작은 시작에 집중해보세요. 부담을 줄이면 오히려 흐름이 부드러워집니다.',
    closing: '오늘은 가볍게 첫발을 떼어도 괜찮습니다.',
  },
  magician: {
    flow:
      '오늘은 말과 행동의 방향을 분명히 할수록 일이 잘 정리되는 날입니다. 가지고 있는 재료를 잘 쓰면 작은 성과가 보일 수 있어요.',
    watch:
      '생각만 많아지고 실행이 늦어지지 않도록 조심하세요. 보여주기보다 실제로 움직이는 힘이 중요합니다.',
    advice: '해야 할 일을 하나 정하고 바로 시작해보세요. 짧은 집중이 하루의 분위기를 바꿀 수 있습니다.',
    closing: '오늘의 열쇠는 분명한 의도입니다.',
  },
  'high-priestess': {
    flow:
      '오늘은 겉으로 드러난 일보다 안쪽의 감각이 더 중요하게 느껴질 수 있습니다. 서두르지 않으면 놓쳤던 흐름이 보입니다.',
    watch:
      '불확실한 정보를 억지로 결론 내리려 하면 마음만 복잡해질 수 있어요. 확인되지 않은 말은 잠시 두세요.',
    advice: '조용한 시간을 조금이라도 만들어보세요. 오늘은 직감과 관찰이 좋은 안내가 됩니다.',
    closing: '답은 조금 천천히 떠오를 수 있습니다.',
  },
  empress: {
    flow:
      '오늘은 몸과 마음을 돌볼수록 하루의 결이 부드러워지는 흐름입니다. 작은 즐거움과 편안함이 생각보다 큰 힘이 됩니다.',
    watch:
      '무리해서 챙기거나 지나치게 많이 떠안지 않도록 조심하세요. 여유가 사라지면 좋은 마음도 쉽게 지칠 수 있습니다.',
    advice: '따뜻한 식사, 정리된 공간, 짧은 휴식처럼 감각을 편안하게 해주는 일을 선택해보세요.',
    closing: '나를 돌보는 일이 오늘의 운을 살립니다.',
  },
  emperor: {
    flow:
      '오늘은 기준을 세우고 차분히 정리할수록 안정감이 커지는 날입니다. 흐트러진 일을 구조화하기 좋습니다.',
    watch:
      '모든 일을 통제하려 하면 오히려 피로가 커질 수 있어요. 꼭 잡아야 할 것과 내려놓아도 될 것을 구분하세요.',
    advice: '우선순위를 세 가지 이하로 줄여보세요. 분명한 순서가 하루를 단단하게 받쳐줍니다.',
    closing: '차분한 기준이 오늘의 중심입니다.',
  },
  hierophant: {
    flow:
      '오늘은 기본과 원칙을 지킬 때 흐름이 편안해집니다. 익숙한 방식 안에서 안정적인 답을 찾기 좋은 날이에요.',
    watch:
      '남들이 정한 기준에 너무 끌려가면 내 속도가 흐려질 수 있습니다. 조언은 참고하되 판단은 스스로 하세요.',
    advice: '검증된 방법부터 차근차근 따라가보세요. 오늘은 무리한 변칙보다 꾸준함이 좋습니다.',
    closing: '기본을 지키면 길이 단정해집니다.',
  },
  lovers: {
    flow:
      '오늘은 선택의 기준을 다시 확인하게 되는 흐름입니다. 마음이 끌리는 쪽과 실제로 편안한 쪽을 함께 살펴보세요.',
    watch:
      '순간의 기분만으로 결정하면 나중에 다시 고민이 생길 수 있습니다. 중요한 선택은 가치와 현실을 같이 보세요.',
    advice: '어떤 선택이 나를 더 가볍고 정직하게 만드는지 적어보세요. 답이 조금 더 선명해질 수 있습니다.',
    closing: '오늘은 마음과 기준을 함께 놓고 보세요.',
  },
  chariot: {
    flow:
      '오늘은 움직임이 필요한 날입니다. 방향만 분명하다면 생각보다 빠르게 정리되는 일이 있을 수 있어요.',
    watch:
      '속도만 앞세우면 세부적인 부분을 놓칠 수 있습니다. 급할수록 방향을 한 번 더 확인하세요.',
    advice: '미루던 일을 하나 정해 바로 처리해보세요. 작은 추진력이 하루 전체에 힘을 줍니다.',
    closing: '움직이되 방향을 잃지 마세요.',
  },
  strength: {
    flow:
      '오늘은 부드럽지만 단단한 태도가 도움이 됩니다. 강하게 밀어붙이기보다 차분히 버티는 힘이 더 크게 작용해요.',
    watch:
      '참는 것과 나를 돌보지 않는 것은 다릅니다. 감정을 억누르기만 하면 피로가 쌓일 수 있어요.',
    advice: '말투와 속도를 조금 낮춰보세요. 온화한 대응이 상황을 더 안정적으로 이끌 수 있습니다.',
    closing: '오늘의 힘은 조용한 침착함입니다.',
  },
  hermit: {
    flow:
      '오늘은 혼자 생각을 정리할 시간이 필요한 흐름입니다. 바깥의 소음보다 내 안의 기준을 듣는 편이 좋습니다.',
    watch:
      '너무 오래 혼자만 붙잡고 있으면 생각이 반복될 수 있어요. 필요한 정보와 단순한 걱정을 구분하세요.',
    advice: '짧게 산책하거나 메모하며 마음을 정리해보세요. 답보다 방향을 찾는 데 도움이 됩니다.',
    closing: '조용히 비워낼수록 길이 보입니다.',
  },
  'wheel-of-fortune': {
    flow:
      '오늘은 예상 밖의 변화가 들어올 수 있는 날입니다. 흐름이 바뀌어도 유연하게 맞추면 기회가 보일 수 있어요.',
    watch:
      '계획이 달라진다고 곧바로 나쁜 흐름으로 볼 필요는 없습니다. 다만 충동적인 선택은 피하는 편이 좋습니다.',
    advice: '일정을 조금 여유 있게 잡아보세요. 변화에 대응할 공간이 오늘의 운을 편하게 만듭니다.',
    closing: '흐름이 바뀌면 나도 부드럽게 조정하세요.',
  },
  justice: {
    flow:
      '오늘은 사실과 균형을 차분히 보는 힘이 필요합니다. 감정보다 기준을 세우면 판단이 한결 맑아집니다.',
    watch:
      '한쪽 이야기만 듣고 결정하면 놓치는 부분이 생길 수 있어요. 확인할 것은 확인하고 넘어가세요.',
    advice: '중요한 일은 기록으로 남기고, 약속이나 일정은 다시 확인해보세요.',
    closing: '분명한 확인이 오늘의 불안을 줄입니다.',
  },
  'hanged-man': {
    flow:
      '오늘은 빨리 결론 내기보다 관점을 바꿔보는 흐름입니다. 잠시 멈추면 보이지 않던 선택지가 보일 수 있어요.',
    watch:
      '기다림이 길어지면 무기력해질 수 있습니다. 멈춤과 방치를 구분하는 것이 중요합니다.',
    advice: '바로 해결되지 않는 일은 다른 각도에서 바라보세요. 작은 거리두기가 생각을 정리해줍니다.',
    closing: '오늘의 멈춤은 방향을 바꾸는 시간입니다.',
  },
  death: {
    flow:
      '오늘은 오래 붙잡고 있던 것을 정리하기 좋은 흐름입니다. 끝내야 할 일을 끝낼수록 새 여유가 생깁니다.',
    watch:
      '아쉬움 때문에 이미 지나간 방식을 계속 반복하지 않도록 조심하세요. 비워야 들어오는 것도 있습니다.',
    advice: '작은 정리부터 시작해보세요. 물건, 일정, 생각 중 하나를 덜어내는 것만으로도 가벼워집니다.',
    closing: '비워낸 자리에 새 흐름이 들어옵니다.',
  },
  temperance: {
    flow:
      '오늘은 균형과 조절이 중요한 날입니다. 급하게 몰아가기보다 속도를 맞추면 하루가 안정됩니다.',
    watch:
      '한쪽으로 치우치면 쉽게 지칠 수 있어요. 일과 휴식, 말과 침묵의 균형을 살펴보세요.',
    advice: '무리한 계획은 조금 덜어내고, 가능한 만큼 꾸준히 이어가보세요.',
    closing: '천천히 맞춰가는 흐름이 가장 좋습니다.',
  },
  devil: {
    flow:
      '오늘은 습관적으로 끌리는 일이나 생각을 알아차리기 좋은 날입니다. 반복되는 패턴을 보면 선택의 여지가 생깁니다.',
    watch:
      '당장의 자극이나 편한 선택이 나중의 피로로 이어질 수 있어요. 충동을 바로 행동으로 옮기지 마세요.',
    advice: '잠시 멈추고 “이 선택이 나를 편하게 하는가”를 물어보세요. 작은 절제가 큰 여유를 만듭니다.',
    closing: '오늘은 패턴을 알아차리는 것만으로도 충분합니다.',
  },
  tower: {
    flow:
      '오늘은 예상 밖의 깨달음이나 일정 변화가 생길 수 있습니다. 흔들림 속에서도 꼭 필요한 사실이 드러날 수 있어요.',
    watch:
      '갑작스러운 분위기에 휩쓸려 바로 반응하지 않도록 조심하세요. 놀란 마음이 가라앉은 뒤 판단해도 늦지 않습니다.',
    advice: '계획이 틀어지면 우선순위를 다시 세우세요. 무너진 부분을 억지로 붙잡기보다 새로 정리하는 편이 좋습니다.',
    closing: '흔들림 뒤에는 더 선명한 기준이 남습니다.',
  },
  star: {
    flow:
      '오늘은 마음을 회복하고 다시 희망을 정리하기 좋은 흐름입니다. 작지만 밝은 신호를 놓치지 마세요.',
    watch:
      '기대가 너무 커지면 현실의 작은 진전이 보이지 않을 수 있습니다. 조용한 회복도 충분히 의미가 있습니다.',
    advice: '물을 마시고, 숨을 고르고, 오늘의 좋은 점 하나를 적어보세요. 마음의 결이 조금 맑아질 수 있습니다.',
    closing: '작은 희망을 차분히 믿어보세요.',
  },
  moon: {
    flow:
      '오늘은 감정과 생각이 조금 흐릿하게 느껴질 수 있습니다. 확실하지 않은 일은 시간을 두고 보는 편이 좋습니다.',
    watch:
      '불안이 사실처럼 느껴질 수 있어요. 추측과 확인된 일을 구분하는 것이 중요합니다.',
    advice: '중요한 결정은 서두르지 말고, 필요한 정보부터 차분히 모아보세요.',
    closing: '흐린 날에는 천천히 보는 것이 지혜입니다.',
  },
  sun: {
    flow:
      '오늘은 비교적 밝고 솔직한 흐름이 들어옵니다. 단순하게 생각할수록 일이 더 잘 풀릴 수 있어요.',
    watch:
      '좋은 분위기에 들떠 세부 사항을 놓치지 않도록 하세요. 즐거움 속에서도 기본은 챙기는 편이 좋습니다.',
    advice: '밝은 쪽으로 몸을 움직여보세요. 사람, 장소, 일 중 하나를 더 건강한 방향으로 선택해보면 좋습니다.',
    closing: '오늘은 단순하고 밝은 선택이 운을 엽니다.',
  },
  judgement: {
    flow:
      '오늘은 미뤄둔 판단이나 정리가 떠오를 수 있습니다. 스스로에게 솔직해질수록 다음 방향이 보입니다.',
    watch:
      '스스로를 지나치게 몰아붙이면 중요한 메시지를 놓칠 수 있어요. 후회보다 배움에 초점을 맞춰보세요.',
    advice: '끝내야 할 일이나 답해야 할 일을 하나 정리해보세요. 마음이 한결 가벼워질 수 있습니다.',
    closing: '오늘의 부름은 더 가벼운 쪽으로 향합니다.',
  },
  world: {
    flow:
      '오늘은 하나의 흐름을 마무리하고 정리하기 좋은 날입니다. 끝까지 해낸 일이 작은 만족으로 돌아올 수 있어요.',
    watch:
      '완벽하게 끝내려다 시작한 일을 오래 붙잡지 않도록 조심하세요. 충분한 마무리도 좋은 마무리입니다.',
    advice: '오늘 할 수 있는 범위를 정하고 깔끔하게 닫아보세요. 끝맺음이 다음 흐름을 열어줍니다.',
    closing: '마무리가 곧 새로운 시작을 준비합니다.',
  },
};

export function getLocalizedCardName(
  card: TarotCardData,
  language: Language,
): string {
  if (language === 'ko') {
    return KOREAN_CARD_NAMES[card.id] ?? card.name;
  }

  return card.name;
}

export function getCardMeaningForDisplay(
  drawnCard: DrawnCard,
  language: Language,
  readingType: ReadingTypeId,
): string {
  if (language === 'ko') {
    if (readingType === 'dailyFortune') {
      return getOpeningSentence(getKoreanDailyFortuneCopy(drawnCard.card.id).flow);
    }

    if (readingType === 'dailyLoveCard' || readingType === 'loveClarity') {
      return getKoreanRelationshipMeaning(drawnCard.orientation);
    }

    return drawnCard.orientation === 'upright'
      ? getKoreanGeneralMeaning(drawnCard.card.id)
      : '지금은 흐름이 조금 막히거나 속도가 맞지 않을 수 있습니다. 서두르기보다 상황을 차분히 다시 살펴보세요.';
  }

  if (readingType === 'dailyFortune') {
    return drawnCard.orientation === 'upright'
      ? drawnCard.card.uprightMeaning
      : drawnCard.card.reversedMeaning;
  }

  return drawnCard.card.loveMeaning;
}

export function getCardAdviceForDisplay(
  drawnCard: DrawnCard,
  language: Language,
  readingType: ReadingTypeId,
): string {
  if (language === 'ko') {
    if (readingType === 'dailyFortune') {
      return getKoreanDailyFortuneCopy(drawnCard.card.id).advice;
    }

    return '마음이 흔들릴수록 말보다 행동, 기대보다 현실의 흐름을 천천히 확인해보세요.';
  }

  return drawnCard.card.advice;
}

export function getKoreanDailyFortuneCopy(cardId: string): DailyFortuneCopy {
  return KOREAN_DAILY_FORTUNE[cardId] ?? KOREAN_DAILY_FORTUNE.fool;
}

function getKoreanGeneralMeaning(cardId: string): string {
  const dailyCopy = getKoreanDailyFortuneCopy(cardId);
  return dailyCopy.flow;
}

function getOpeningSentence(value: string): string {
  const firstPeriodIndex = value.indexOf('.');
  return firstPeriodIndex >= 0 ? value.slice(0, firstPeriodIndex + 1) : value;
}

function getKoreanRelationshipMeaning(orientation: CardOrientation): string {
  return orientation === 'upright'
    ? '감정의 흐름이 비교적 선명하게 드러나는 카드입니다. 설렘만 보기보다 안정감과 일관성을 함께 살펴보세요.'
    : '아직 말로 다 정리되지 않은 감정이나 엇갈린 타이밍을 보여줄 수 있습니다. 서두르지 말고 반복되는 행동을 차분히 확인해보세요.';
}
