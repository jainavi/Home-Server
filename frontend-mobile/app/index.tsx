import Cursor from "@/components/Cursor";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
  return (
    <SafeAreaView className="bg-blk h-full justify-center items-center">
      <View className="flex-row items-center">
        <Text className="font-trmnl text-wht text-4xl">
          [localhost:///8000]
        </Text>
        <Cursor customStyle="w-1 h-9 ml-1 bg-wht" blink />
      </View>
    </SafeAreaView> 
  );
};
