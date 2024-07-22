import { useState } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Modal, Text, View } from "react-native";

import { Power } from "lucide-react-native";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default () => {
  const [showShutDownModal, setShowShutDownModal] = useState(false);

  return (
    <>
      {/* Shutdown Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showShutDownModal}
        onRequestClose={() => {
          setShowShutDownModal(false);
        }}
      >
        <View className="absolute top-0 left-0 -z-10 w-full h-full bg-gry-light opacity-30" />
        <Card customStyles="bg-blk w-3/4 self-center my-auto">
          <Text className="font-trmnl text-wht text-lg">
            &gt; Shutdown the Server?
          </Text>
          <View className="flex-row justify-around mt-4">
            <Button
              customStyles=""
              onPress={() => {
                setShowShutDownModal(false);
              }}
            >
              <Text className="font-trmnl text-wht text-lg">[ No ]</Text>
            </Button>
            <Button
              customStyles=""
              onPress={() => {
                fetch(
                  process.env.EXPO_PUBLIC_SERVER_BASE_URL + "/power/shutdown",
                  {
                    method: "POST",
                  }
                );
                setShowShutDownModal(false);
              }}
            >
              <Text className="font-trmnl text-wht text-lg">[ Yes ]</Text>
            </Button>
          </View>
        </Card>
      </Modal>

      {/* Tabs */}
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
          headerRight: () => (
            <Power
              className="text-wht font-trmnl mr-4"
              onPress={() => {
                setShowShutDownModal(true);
              }}
            />
          ),
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
