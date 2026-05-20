import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";
import { posthog } from "@/lib/posthog";

export default function AITeacherScreen() {
  const router = useRouter();

  useEffect(() => {
    posthog.capture("ai_teacher_viewed");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-6">
          <Ionicons
            name="person-circle"
            size={80}
            color={colors.primary.purple}
          />
        </View>

        <Text
          className="h2 text-center mb-3"
          style={{ color: colors.neutral.textPrimary }}
        >
          AI Language Teacher
        </Text>

        <Text
          className="body-regular text-center mb-8"
          style={{ color: colors.neutral.textSecondary }}
        >
          Select a lesson from the Learn tab to start an interactive voice
          lesson with your AI teacher.
        </Text>

        <TouchableOpacity
          style={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            backgroundColor: colors.primary.purple,
            borderRadius: 8,
            marginTop: 12,
          }}
          onPress={() => router.push("/(tabs)/learn")}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 14,
              color: "#fff",
            }}
          >
            Browse Lessons
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
