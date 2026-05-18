import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/constants/theme";
import { Lesson } from "@/types/learning";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked?: boolean;
  onPress: () => void;
}

function getLessonThumbnail(lessonId: string): string {
  return `https://picsum.photos/seed/${lessonId}/160/100`;
}

export function LessonCard({
  lesson,
  index,
  isCompleted,
  isInProgress,
  isLocked = false,
  onPress,
}: LessonCardProps) {
  const handlePress = () => {
    if (!isLocked) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={isLocked ? 1 : 0.7}
      onPress={handlePress}
      style={[
        styles.card,
        isInProgress && styles.cardInProgress,
        isLocked && styles.cardLocked,
      ]}
      disabled={isLocked}
    >
      <View className="flex-1">
        <Text className="text-text-secondary text-xs font-poppins-regular mb-1">
          Lesson {index + 1}
        </Text>

        <Text
          className="font-poppins-semibold text-base text-text-primary mb-0.5"
          numberOfLines={2}
        >
          {lesson.title}
        </Text>

        {isInProgress && (
          <Text className="text-lingua-purple text-xs font-poppins-medium">
            In progress
          </Text>
        )}
      </View>

      {isCompleted && (
        <View style={styles.completedIcon}>
          <Ionicons name="checkmark" size={18} color="#fff" />
        </View>
      )}

      {isInProgress && (
        <Image
          source={{ uri: getLessonThumbnail(lesson.id) }}
          style={styles.lessonImage}
          resizeMode="cover"
        />
      )}

      {isLocked && (
        <View style={styles.lockedIcon}>
          <Ionicons
            name="lock-closed"
            size={18}
            color={colors.neutral.textSecondary}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  cardInProgress: {
    backgroundColor: "#f3f0ff",
    borderColor: colors.primary.purple,
    borderWidth: 2,
  },
  cardLocked: {
    opacity: 0.6,
  },
  completedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.semantic.success,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  lessonImage: {
    width: 80,
    height: 64,
    borderRadius: 12,
    marginLeft: 12,
  },
  lockedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
