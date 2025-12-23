export type ViewState = 'LOGIN' | 'HOME' | 'PURPOSE_LIST' | 'PURPOSE_DETAIL' | 'RITUAL' | 'PRAYER_30';

export interface User {
  name: string;
  email: string;
}

export interface PurposeDay {
  id: number;
  title: string;
  theme: string;
  scripture: string;
  devotional: string;
  guidance: string;
  prayer: string;
  audioDuration: string; // Formatting like "5:30"
}

export interface PrayerDay {
  day: number;
  title: string;
  content: string;
  completed: boolean;
}

export interface RitualStep {
  text: string;
  durationSeconds: number;
}