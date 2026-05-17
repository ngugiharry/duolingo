import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-text-primary">Home</Text>
        <Text className="mt-2 text-text-secondary">Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
}
