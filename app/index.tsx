import { useLanguageStore } from "@/store/languageStore";
import { useUser } from "@clerk/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function App() {
  const { isSignedIn, isLoaded } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && !selectedLanguage) {
      router.replace("/language-select");
    } else if (isSignedIn && selectedLanguage) {
      router.replace("/(tabs)/home");
    }
  }, [isLoaded, isSignedIn, selectedLanguage, router]);

  if (!isLoaded) {
    return null;
  }

  const clearStorage = async () => {
    Alert.alert(
      "Clear Storage",
      "This will clear the async storage. You will need to select a language again.",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Clear",
          onPress: async () => {
            await AsyncStorage.removeItem("language-storage");
            router.replace("/language-select");
          },
        },
      ],
    );
  };

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

      {isSignedIn && selectedLanguage && (
        <TouchableOpacity
          onPress={clearStorage}
          className="mt-4 w-full rounded-3xl bg-red-500 px-6 py-4"
        >
          <Text className="text-center text-base font-semibold text-white">
            Clear Storage (Testing)
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
