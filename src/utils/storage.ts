import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Language, SavedReading } from '../types';

const READINGS_STORAGE_KEY = '@moonlit_tarot/readings';
const LANGUAGE_STORAGE_KEY = '@moonlit_tarot/language';

export async function getSavedReadings(): Promise<SavedReading[]> {
  const rawReadings = await AsyncStorage.getItem(READINGS_STORAGE_KEY);
  if (!rawReadings) {
    return [];
  }

  try {
    const parsedReadings = JSON.parse(rawReadings) as SavedReading[];
    return parsedReadings.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  } catch {
    return [];
  }
}

export async function saveReading(
  reading: Omit<SavedReading, 'id' | 'createdAt'>,
): Promise<SavedReading> {
  const existingReadings = await getSavedReadings();
  const savedReading: SavedReading = {
    ...reading,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(READINGS_STORAGE_KEY, JSON.stringify([savedReading, ...existingReadings]));
  return savedReading;
}

export async function deleteReading(id: string): Promise<SavedReading[]> {
  const existingReadings = await getSavedReadings();
  const nextReadings = existingReadings.filter((reading) => reading.id !== id);
  await AsyncStorage.setItem(READINGS_STORAGE_KEY, JSON.stringify(nextReadings));
  return nextReadings;
}

export async function getSavedLanguage(): Promise<Language | null> {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  return savedLanguage === 'en' || savedLanguage === 'ko' ? savedLanguage : null;
}

export async function saveLanguage(language: Language): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}
