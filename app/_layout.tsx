import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "../global.css";
import { fontAssets } from "../theme/fonts";

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontAssets);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
