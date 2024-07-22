import { useEffect } from "react";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft } from "lucide-react-native";

import { SocketProvider } from "@/context/SocketContext";

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
    (async () => {
      if (error) throw error;
      const name = await AsyncStorage.getItem("name");
      // TODO: This may be buggy, check if it works as expected in production
      if (fontsLoaded) {
        SplashScreen.hideAsync();
        if (name) router.replace("/home");
      }
    })();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <SocketProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#09090b",
          },
          headerTitleStyle: {
            fontFamily: "VT323-Regular",
            color: "white",
            fontSize: 36,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="home/print"
          options={{
            headerTitle: "///:Print",
            headerLeft: () => (
              <ArrowLeft
                className="text-wht self-center mr-2"
                onPress={() => router.back()}
              />
            ),
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </SocketProvider>
  );
}
