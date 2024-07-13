import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

export default () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#09090b",
            shadowColor: "transparent",
          },
          headerTitleStyle: {
            fontFamily: "VT323-Regular",
            color: "white",
            fontSize: 36,
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                className={`text-xl ${
                  focused ? "text-blk font-jbmbold" : "text-gry-light font-jbm"
                }`}
              >
                {focused && "[:"}Home{focused && ":]"}
              </Text>
            );
          },
          tabBarStyle: { height: 32 },
          tabBarIcon: () => null,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerTitle: "///:Home",
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
};
