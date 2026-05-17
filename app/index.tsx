import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold text-slate-950">
        Welcome to muolingo
      </Text>
      <Text className="mt-3 text-center text-base text-slate-500">
        Tap below to see the onboarding screen.
      </Text>

      <Link href="/onboarding" asChild>
        <TouchableOpacity className="mt-8 w-full rounded-3xl bg-[#5347ff] px-6 py-4">
          <Text className="text-center text-base font-semibold text-white">
            Open Onboarding
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/language-select" asChild>
        <TouchableOpacity className="mt-4 w-full rounded-3xl bg-lingua-purple px-6 py-4">
          <Text className="text-center text-base font-semibold text-white">
            Choose Language
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
