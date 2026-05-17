import { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // Spanish Lessons
  {
    id: "es-l1",
    unitId: "es-u1",
    languageCode: "es",
    title: "Hello, World!",
    description: "Learn essential Spanish greetings",
    icon: "👋",
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,
    goals: [
      { description: "Master basic greetings", xpReward: 5 },
      { description: "Respond to introductions", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "Hola",
        translation: "Hello",
        pronunciation: "OH-lah",
        emoji: "👋",
      },
      {
        word: "Buenos días",
        translation: "Good morning",
        pronunciation: "bweh-nos DEE-ahs",
        emoji: "🌅",
      },
      {
        word: "Buenas noches",
        translation: "Good night",
        pronunciation: "bweh-nas NOH-ches",
        emoji: "🌙",
      },
      {
        word: "¿Cómo estás?",
        translation: "How are you?",
        pronunciation: "KOH-moh es-TAHS",
        emoji: "❓",
      },
      {
        word: "Bien, gracias",
        translation: "Good, thanks",
        pronunciation: "bee-EN GRAH-see-ahs",
        emoji: "😊",
      },
    ],
    phrases: [
      {
        text: "Hola, ¿cómo te llamas?",
        translation: "Hello, what's your name?",
        pronunciation: "OH-lah KOH-moh teh YAH-mahs",
      },
      {
        text: "Me llamo Juan",
        translation: "My name is Juan",
        pronunciation: "meh YAH-moh HWAN",
      },
      {
        text: "Mucho gusto",
        translation: "Nice to meet you",
        pronunciation: "MOO-choh GOOS-toh",
      },
    ],
    activities: [
      {
        id: "es-l1-a1",
        type: "multiple-choice",
        question: "How do you say 'Hello' in Spanish?",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correctAnswer: 0,
        hint: "It's the most common greeting",
      },
      {
        id: "es-l1-a2",
        type: "translate",
        question: "Translate: 'Buenos días'",
        correctAnswer: "Good morning",
        hint: "It means a greeting for the morning",
      },
      {
        id: "es-l1-a3",
        type: "multiple-choice",
        question: "What does '¿Cómo estás?' mean?",
        options: [
          "Where are you?",
          "How are you?",
          "What is your name?",
          "Do you speak Spanish?",
        ],
        correctAnswer: 1,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a friendly Spanish teacher. Greet the student warmly and help them practice basic Spanish greetings. Use simple language and celebrate their progress.",
      introMessage:
        "Hola! Welcome to your first Spanish lesson. I'm so excited to help you learn today. Let's start with some fun greetings!",
      topics: [
        "Basic greetings (Hola, Buenos días)",
        "How to respond to greetings",
        "Introducing yourself in Spanish",
      ],
    },
  },

  {
    id: "es-l2",
    unitId: "es-u1",
    languageCode: "es",
    title: "Numbers 1-10",
    description: "Count and learn numbers in Spanish",
    icon: "🔢",
    xpReward: 10,
    estimatedMinutes: 5,
    order: 2,
    goals: [
      { description: "Count from 1 to 10", xpReward: 5 },
      { description: "Recognize spoken numbers", xpReward: 5 },
    ],
    vocabulary: [
      { word: "Uno", translation: "One", pronunciation: "OO-noh", emoji: "1️⃣" },
      { word: "Dos", translation: "Two", pronunciation: "dohss", emoji: "2️⃣" },
      {
        word: "Tres",
        translation: "Three",
        pronunciation: "tress",
        emoji: "3️⃣",
      },
      {
        word: "Cuatro",
        translation: "Four",
        pronunciation: "KWAH-troh",
        emoji: "4️⃣",
      },
      {
        word: "Cinco",
        translation: "Five",
        pronunciation: "SEEN-koh",
        emoji: "5️⃣",
      },
      {
        word: "Seis",
        translation: "Six",
        pronunciation: "say-ess",
        emoji: "6️⃣",
      },
      {
        word: "Siete",
        translation: "Seven",
        pronunciation: "see-EH-teh",
        emoji: "7️⃣",
      },
      {
        word: "Ocho",
        translation: "Eight",
        pronunciation: "OH-choh",
        emoji: "8️⃣",
      },
      {
        word: "Nueve",
        translation: "Nine",
        pronunciation: "noo-EH-veh",
        emoji: "9️⃣",
      },
      {
        word: "Diez",
        translation: "Ten",
        pronunciation: "dee-ess",
        emoji: "🔟",
      },
    ],
    phrases: [
      {
        text: "Tengo cinco años",
        translation: "I am five years old",
        pronunciation: "TEN-goh SEEN-koh AH-nyos",
      },
      {
        text: "Dos más tres es cinco",
        translation: "Two plus three is five",
        pronunciation: "dohss mahs tress ess SEEN-koh",
      },
    ],
    activities: [
      {
        id: "es-l2-a1",
        type: "multiple-choice",
        question: "What number is 'Cinco'?",
        options: ["3", "5", "7", "9"],
        correctAnswer: 1,
      },
      {
        id: "es-l2-a2",
        type: "translate",
        question: "Translate: 'Siete'",
        correctAnswer: "Seven",
      },
      {
        id: "es-l2-a3",
        type: "multiple-choice",
        question: "Which is 'Ocho'?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an enthusiastic math-loving Spanish teacher. Help the student practice numbers with fun activities and word problems. Use numbers in context.",
      introMessage:
        "¡Hola! Today we're learning numbers! Numbers are everywhere - let's count together from uno to diez!",
      topics: [
        "Spanish numbers 1-10",
        "Counting practice",
        "Simple math in Spanish",
      ],
    },
  },

  {
    id: "es-l3",
    unitId: "es-u1",
    languageCode: "es",
    title: "Common Phrases",
    description: "Learn useful everyday phrases",
    icon: "💬",
    xpReward: 10,
    estimatedMinutes: 5,
    order: 3,
    goals: [
      { description: "Master polite expressions", xpReward: 5 },
      { description: "Ask basic questions", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "Gracias",
        translation: "Thank you",
        pronunciation: "GRAH-see-ahs",
        emoji: "🙏",
      },
      {
        word: "Por favor",
        translation: "Please",
        pronunciation: "por fah-VOR",
        emoji: "✋",
      },
      {
        word: "De nada",
        translation: "You're welcome",
        pronunciation: "deh NAH-dah",
        emoji: "😊",
      },
      {
        word: "Perdón",
        translation: "Sorry",
        pronunciation: "per-DOHN",
        emoji: "😔",
      },
      {
        word: "Sí",
        translation: "Yes",
        pronunciation: "see",
        emoji: "✅",
      },
      { word: "No", translation: "No", pronunciation: "noh", emoji: "❌" },
      {
        word: "Adiós",
        translation: "Goodbye",
        pronunciation: "ah-dee-OHS",
        emoji: "👋",
      },
      {
        word: "Hasta luego",
        translation: "See you later",
        pronunciation: "AH-stah loo-EH-goh",
        emoji: "⏰",
      },
    ],
    phrases: [
      {
        text: "¿Hablas inglés?",
        translation: "Do you speak English?",
        pronunciation: "AH-blahs een-GLÉS",
      },
      {
        text: "No entiendo",
        translation: "I don't understand",
        pronunciation: "noh en-tee-EN-doh",
      },
      {
        text: "¿Puedes repetir?",
        translation: "Can you repeat?",
        pronunciation: "pweh-dehs reh-peh-TEER",
      },
    ],
    activities: [
      {
        id: "es-l3-a1",
        type: "multiple-choice",
        question: "What does 'Gracias' mean?",
        options: ["Hello", "Thank you", "Sorry", "Goodbye"],
        correctAnswer: 1,
      },
      {
        id: "es-l3-a2",
        type: "translate",
        question: "How do you say 'Please' in Spanish?",
        correctAnswer: "Por favor",
      },
      {
        id: "es-l3-a3",
        type: "multiple-choice",
        question: "Which means 'Goodbye'?",
        options: ["Hola", "Gracias", "Adiós", "Sí"],
        correctAnswer: 2,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a patient and encouraging Spanish teacher. Teach polite expressions and help the student practice proper etiquette in Spanish conversations. Be warm and supportive.",
      introMessage:
        "¡Excelente! Now let's learn phrases that will help you have real conversations. These are the tools of politeness!",
      topics: [
        "Polite expressions",
        "Thank you and apologies",
        "Saying goodbye",
        "Asking for help",
      ],
    },
  },

  // French Lessons
  {
    id: "fr-l1",
    unitId: "fr-u1",
    languageCode: "fr",
    title: "Bonjour! First Steps",
    description: "Start your French journey with greetings",
    icon: "💙",
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,
    goals: [
      { description: "Learn French greetings", xpReward: 5 },
      { description: "Introduce yourself formally", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "Bonjour",
        translation: "Hello/Good day",
        pronunciation: "bohn-ZHOOR",
        emoji: "👋",
      },
      {
        word: "Bonsoir",
        translation: "Good evening",
        pronunciation: "bohn-SWAHR",
        emoji: "🌆",
      },
      {
        word: "Comment ça va?",
        translation: "How are you?",
        pronunciation: "koh-mahn sah vah",
        emoji: "❓",
      },
      {
        word: "Ça va bien",
        translation: "I'm doing well",
        pronunciation: "sah vah bee-yen",
        emoji: "😊",
      },
      {
        word: "Je m'appelle",
        translation: "My name is",
        pronunciation: "zhuh mah-PEL",
        emoji: "📝",
      },
    ],
    phrases: [
      {
        text: "Enchanté de vous rencontrer",
        translation: "Pleased to meet you",
        pronunciation: "ohn-shahn-tay duh voo ruhn-kohn-tray",
      },
      {
        text: "Parlez-vous anglais?",
        translation: "Do you speak English?",
        pronunciation: "par-lay-voo ahn-GLAY",
      },
    ],
    activities: [
      {
        id: "fr-l1-a1",
        type: "multiple-choice",
        question: "What is the French greeting 'Bonjour'?",
        options: ["Thank you", "Hello", "Please", "Sorry"],
        correctAnswer: 1,
      },
      {
        id: "fr-l1-a2",
        type: "translate",
        question: "Translate: 'Comment ça va?'",
        correctAnswer: "How are you?",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a sophisticated French instructor. Teach the elegance and formality of French greetings. Use proper pronunciation and cultural context.",
      introMessage:
        "Bonjour! Welcome to French. Today we'll learn how to greet people with the elegance and charm of the French language.",
      topics: ["French greetings", "Formal vs informal", "Basic introductions"],
    },
  },

  // German Lessons
  {
    id: "de-l1",
    unitId: "de-u1",
    languageCode: "de",
    title: "Guten Tag!",
    description: "Learn German basics and greetings",
    icon: "👋",
    xpReward: 10,
    estimatedMinutes: 5,
    order: 1,
    goals: [
      { description: "Master German greetings", xpReward: 5 },
      { description: "Learn basic courtesy", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "Guten Tag",
        translation: "Good day",
        pronunciation: "GOO-ten tahg",
        emoji: "☀️",
      },
      {
        word: "Guten Morgen",
        translation: "Good morning",
        pronunciation: "GOO-ten MOR-gen",
        emoji: "🌅",
      },
      {
        word: "Wie geht es?",
        translation: "How are you?",
        pronunciation: "vee GAYT es",
        emoji: "❓",
      },
      {
        word: "Mir geht es gut",
        translation: "I'm doing well",
        pronunciation: "meer GAYT es goot",
        emoji: "😊",
      },
    ],
    phrases: [
      {
        text: "Ich heiße...",
        translation: "My name is...",
        pronunciation: "ikh HY-suh",
      },
      {
        text: "Freut mich",
        translation: "Nice to meet you",
        pronunciation: "froyt mikh",
      },
    ],
    activities: [
      {
        id: "de-l1-a1",
        type: "multiple-choice",
        question: "What does 'Guten Tag' mean?",
        options: ["Good morning", "Good day", "Good evening", "Goodbye"],
        correctAnswer: 1,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a precise and clear German instructor. Emphasize proper pronunciation and grammar structures. Be methodical and patient.",
      introMessage:
        "Willkommen! Let's start learning German. We'll begin with greetings and basic courtesy phrases.",
      topics: ["German greetings", "Basic politeness", "Time-based greetings"],
    },
  },

  // Japanese Lessons
  {
    id: "ja-l1",
    unitId: "ja-u1",
    languageCode: "ja",
    title: "Hiragana Basics",
    description: "Learn the foundation of Japanese writing",
    icon: "📝",
    xpReward: 10,
    estimatedMinutes: 8,
    order: 1,
    goals: [
      { description: "Learn hiragana characters", xpReward: 5 },
      { description: "Read simple syllables", xpReward: 5 },
    ],
    vocabulary: [
      { word: "あ (a)", translation: "A", pronunciation: "ah", emoji: "📄" },
      { word: "い (i)", translation: "I", pronunciation: "ee", emoji: "📄" },
      { word: "う (u)", translation: "U", pronunciation: "oo", emoji: "📄" },
      { word: "え (e)", translation: "E", pronunciation: "eh", emoji: "📄" },
      { word: "お (o)", translation: "O", pronunciation: "oh", emoji: "📄" },
    ],
    phrases: [
      {
        text: "こんにちは",
        translation: "Hello",
        pronunciation: "kon-nee-chee-wah",
      },
      {
        text: "ありがとう",
        translation: "Thank you",
        pronunciation: "ah-ree-gah-toh",
      },
    ],
    activities: [
      {
        id: "ja-l1-a1",
        type: "multiple-choice",
        question: "Which character represents 'a'?",
        options: ["い", "あ", "う", "え"],
        correctAnswer: 1,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a patient Japanese teacher specializing in writing systems. Help the student understand hiragana step by step. Use visual descriptions.",
      introMessage:
        "おはようございます! Welcome to Japanese. Today we'll explore hiragana, the foundation of Japanese writing.",
      topics: [
        "Hiragana vowels",
        "Japanese writing basics",
        "Character recognition",
      ],
    },
  },

  // Korean Lessons
  {
    id: "ko-l1",
    unitId: "ko-u1",
    languageCode: "ko",
    title: "Hangul Mastery",
    description: "Master the Korean alphabet",
    icon: "🔤",
    xpReward: 10,
    estimatedMinutes: 8,
    order: 1,
    goals: [
      { description: "Learn all Hangul characters", xpReward: 5 },
      { description: "Read basic Korean", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "가 (ga)",
        translation: "Ga",
        pronunciation: "gah",
        emoji: "🔤",
      },
      { word: "나 (na)", translation: "Na", pronunciation: "nah", emoji: "🔤" },
      { word: "다 (da)", translation: "Da", pronunciation: "dah", emoji: "🔤" },
      {
        word: "라 (ra)",
        translation: "Ra",
        pronunciation: "rah",
        emoji: "🔤",
      },
      {
        word: "마 (ma)",
        translation: "Ma",
        pronunciation: "mah",
        emoji: "🔤",
      },
    ],
    phrases: [
      {
        text: "안녕하세요",
        translation: "Hello",
        pronunciation: "ahn-nyong-hah-seh-yo",
      },
      {
        text: "감사합니다",
        translation: "Thank you",
        pronunciation: "gahm-sah-hahm-nee-dah",
      },
    ],
    activities: [
      {
        id: "ko-l1-a1",
        type: "multiple-choice",
        question: "Which represents 'ga'?",
        options: ["나", "다", "가", "라"],
        correctAnswer: 2,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are an enthusiastic Korean teacher. Make learning Hangul fun and logical. Explain how the alphabet system works brilliantly.",
      introMessage:
        "환영합니다! Let's learn Hangul together. It's one of the most logical writing systems in the world!",
      topics: ["Hangul consonants", "Hangul vowels", "Basic Korean words"],
    },
  },

  // Mandarin Lessons
  {
    id: "zh-l1",
    unitId: "zh-u1",
    languageCode: "zh",
    title: "Pinyin Foundations",
    description: "Master Chinese pronunciation with pinyin",
    icon: "🎵",
    xpReward: 10,
    estimatedMinutes: 6,
    order: 1,
    goals: [
      { description: "Learn the 4 Mandarin tones", xpReward: 5 },
      { description: "Practice pinyin pronunciation", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "妈 (mā)",
        translation: "Mother",
        pronunciation: "mah (1st tone)",
        emoji: "👩",
      },
      {
        word: "麻 (má)",
        translation: "Hemp",
        pronunciation: "mah (2nd tone)",
        emoji: "🌾",
      },
      {
        word: "马 (mǎ)",
        translation: "Horse",
        pronunciation: "mah (3rd tone)",
        emoji: "🐎",
      },
      {
        word: "骂 (mà)",
        translation: "Scold",
        pronunciation: "mah (4th tone)",
        emoji: "😠",
      },
    ],
    phrases: [
      {
        text: "你好 (nǐ hǎo)",
        translation: "Hello",
        pronunciation: "nee how",
      },
      {
        text: "谢谢 (xièxiè)",
        translation: "Thank you",
        pronunciation: "shyeh shyeh",
      },
    ],
    activities: [
      {
        id: "zh-l1-a1",
        type: "multiple-choice",
        question: "Which tone is used for 'mother' (妈)?",
        options: ["1st tone", "2nd tone", "3rd tone", "4th tone"],
        correctAnswer: 0,
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are a Mandarin teacher who makes tones accessible and fun. Use the pinyin system to help learners understand pronunciation clearly.",
      introMessage:
        "欢迎! Welcome to Mandarin. Today we'll explore pinyin and the famous 4 tones that make Chinese fascinating!",
      topics: ["The 4 Mandarin tones", "Pinyin system basics", "Tone practice"],
    },
  },
];

export const getLessonsByUnit = (unitId: string) => {
  return lessons.filter((lesson) => lesson.unitId === unitId);
};

export const getLessonById = (lessonId: string) => {
  return lessons.find((lesson) => lesson.id === lessonId);
};

export const getLessonsByLanguage = (languageCode: string) => {
  return lessons.filter((lesson) => lesson.languageCode === languageCode);
};
