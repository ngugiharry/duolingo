# Duolingo-Inspired AI Language Learning App

This project is a Duolingo-inspired AI language learning mobile app built with Expo.

The app teaches users languages through interactive lessons that may include:

- video-based AI teacher lessons
- audio lessons
- chat-based AI tutor lessons
- vocabulary review
- local XP and lesson completion
- language selection
- beautiful mobile-first UI inspired by playful learning apps

This is primarily a learning project. The goal is to teach developers how to build a modern AI-powered Expo app feature by feature.

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind / Tailwind CSS
- Zustand
- AsyncStorage
- Clerk for authentication
- Stream / GetStream for video and real-time communication
- Stream Vision Agents for AI video teacher capability
- Server-side API routes or backend functions for secrets, tokens, and AI calls

## Development Philosophy

Build feature by feature.

1. Understand the user request.
2. Check the project guidance before coding.
3. Keep the implementation simple.
4. Avoid overengineering.
5. Prefer readable code over clever code.
6. Build the smallest useful version first.
7. Refactor only when repetition or complexity appears.
8. Keep the app easy to teach and explain.

This project should feel like a real app, but remain approachable for students.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open the app in a simulator or Expo Go from the Expo CLI menu.

You can start developing by editing files in the **app/** directory. This app uses file-based routing via Expo Router.
