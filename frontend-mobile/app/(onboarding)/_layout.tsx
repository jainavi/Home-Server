import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default () => {
  return (
    <>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#09090b" style="light"/>
    </>
  );
};
