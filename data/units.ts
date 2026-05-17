import { Unit } from "@/types/learning";

export const units: Unit[] = [
  // Spanish Units
  {
    id: "es-u1",
    languageCode: "es",
    title: "Greetings & Basics",
    description: "Learn essential greetings and basic survival phrases",
    icon: "👋",
    order: 1,
    lessonIds: ["es-l1", "es-l2", "es-l3"],
  },
  {
    id: "es-u2",
    languageCode: "es",
    title: "Food & Dining",
    description: "Master food vocabulary and restaurant conversations",
    icon: "🍽️",
    order: 2,
    lessonIds: ["es-l4", "es-l5"],
  },
  {
    id: "es-u3",
    languageCode: "es",
    title: "Travel & Places",
    description: "Navigate cities and ask for directions",
    icon: "✈️",
    order: 3,
    lessonIds: ["es-l6", "es-l7"],
  },

  // French Units
  {
    id: "fr-u1",
    languageCode: "fr",
    title: "Bonjour! First Steps",
    description: "Master French greetings and introductions",
    icon: "💬",
    order: 1,
    lessonIds: ["fr-l1", "fr-l2", "fr-l3"],
  },
  {
    id: "fr-u2",
    languageCode: "fr",
    title: "Culture & Numbers",
    description: "Learn numbers and cultural expressions",
    icon: "🎨",
    order: 2,
    lessonIds: ["fr-l4", "fr-l5"],
  },

  // German Units
  {
    id: "de-u1",
    languageCode: "de",
    title: "Guten Tag: Basics",
    description: "German greetings and polite expressions",
    icon: "🤝",
    order: 1,
    lessonIds: ["de-l1", "de-l2"],
  },

  // Japanese Units
  {
    id: "ja-u1",
    languageCode: "ja",
    title: "Hiragana Fundamentals",
    description: "Learn the basics of Japanese writing",
    icon: "📝",
    order: 1,
    lessonIds: ["ja-l1", "ja-l2"],
  },

  // Korean Units
  {
    id: "ko-u1",
    languageCode: "ko",
    title: "Hangul & Basics",
    description: "Master the Korean alphabet and basic phrases",
    icon: "🔤",
    order: 1,
    lessonIds: ["ko-l1", "ko-l2"],
  },

  // Mandarin Units
  {
    id: "zh-u1",
    languageCode: "zh",
    title: "Pinyin & Tones",
    description: "Learn Chinese pronunciation with pinyin",
    icon: "🎵",
    order: 1,
    lessonIds: ["zh-l1", "zh-l2"],
  },
];

export const getUnitsByLanguage = (languageCode: string) => {
  return units.filter((unit) => unit.languageCode === languageCode);
};

export const getUnitById = (unitId: string) => {
  return units.find((unit) => unit.id === unitId);
};
