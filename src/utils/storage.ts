import AsyncStorage from '@react-native-async-storage/async-storage';

import type { SavedReading } from '../types';

const STORAGE_KEY = '@moonlit_tarot/readings';

export async function getSavedReadings(): Promise<SavedReading[]> {
  const rawReadings = await AsyncStorage.getItem(STORAGE_KEY);
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

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([savedReading, ...existingReadings]));
  return savedReading;
}

export async function deleteReading(id: string): Promise<SavedReading[]> {
  const existingReadings = await getSavedReadings();
  const nextReadings = existingReadings.filter((reading) => reading.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextReadings));
  return nextReadings;
}
