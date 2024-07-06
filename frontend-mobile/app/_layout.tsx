import { Text } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "JetBrainsMono-Regular": require("../assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Italic": require("../assets/fonts/JetBrainsMono-Italic.ttf"),
    "JetBrainsMono-Bold": require("../assets/fonts/JetBrainsMono-Bold.ttf"),
    "JetBrainsMono-BoldItalic": require("../assets/fonts/JetBrainsMono-BoldItalic.ttf"),
    "JetBrainsMono-ExtraLight": require("../assets/fonts/JetBrainsMono-ExtraLight.ttf"),
    "JetBrainsMono-ExtraLightItalic": require("../assets/fonts/JetBrainsMono-ExtraLightItalic.ttf"),
    "VT323-Regular": require("../assets/fonts/VT323-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
