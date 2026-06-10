import type { ImageSourcePropType } from 'react-native';

export const TAROT_CARD_IMAGES: Record<string, ImageSourcePropType> = {
  fool: require('../../assets/cards/major/fool.jpg'),
  magician: require('../../assets/cards/major/magician.jpg'),
  'high-priestess': require('../../assets/cards/major/high-priestess.jpg'),
  empress: require('../../assets/cards/major/empress.jpg'),
  emperor: require('../../assets/cards/major/emperor.jpg'),
  hierophant: require('../../assets/cards/major/hierophant.jpg'),
  lovers: require('../../assets/cards/major/lovers.jpg'),
  chariot: require('../../assets/cards/major/chariot.jpg'),
  strength: require('../../assets/cards/major/strength.jpg'),
  hermit: require('../../assets/cards/major/hermit.jpg'),
  'wheel-of-fortune': require('../../assets/cards/major/wheel-of-fortune.jpg'),
  justice: require('../../assets/cards/major/justice.jpg'),
  'hanged-man': require('../../assets/cards/major/hanged-man.jpg'),
  death: require('../../assets/cards/major/death.jpg'),
  temperance: require('../../assets/cards/major/temperance.jpg'),
  devil: require('../../assets/cards/major/devil.jpg'),
  tower: require('../../assets/cards/major/tower.jpg'),
  star: require('../../assets/cards/major/star.jpg'),
  moon: require('../../assets/cards/major/moon.jpg'),
  sun: require('../../assets/cards/major/sun.jpg'),
  judgement: require('../../assets/cards/major/judgement.jpg'),
  world: require('../../assets/cards/major/world.jpg'),
};

export function getTarotCardImageSource(cardId: string) {
  return TAROT_CARD_IMAGES[cardId];
}
