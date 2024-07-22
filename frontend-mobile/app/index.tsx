import { useEffect, useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { ArrowRight, ChevronRight, ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProgressBarDashed from "@/components/ProgressBarDashed";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Cursor from "@/components/Cursor";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";

const LoadingDots = ({ setLoading }: { setLoading: (arg: boolean) => any }) => {
  const [dotsCount, setDotsCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      setDotsCount((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (dotsCount >= 4) setLoading(false);
  }, [dotsCount, setLoading]);

  return Array.from({ length: Math.min(dotsCount, 3) }).map((_, i) => (
    <Text className="text-wht font-trmnl text-lg" key={i}>
      .
    </Text>
  ));
};

export default () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (progress > 1) {
      (async () => {
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("gender", gender);
        setTimeout(() => router.replace("/home"), 4000);
      })();
    }
  }, [progress]);

  // TODO: Refactor this component, use CW instead of this
  return (
    <SafeAreaView className="bg-blk h-full p-4 justify-between">
      {/* localhost text */}
      <View className="flex-1 justify-center">
        <Text className="font-trmnl text-wht text-4xl">
          [localhost:///8000]
        </Text>

        {/* Hi text */}
        <View className="flex-row mt-4 items-center">
          <ChevronRight className="text-wht" size={14} />
          <Text className="text-wht font-trmnl text-lg">Hi 👋, {name}</Text>
          {progress === 0 && (
            <Cursor customStyles="w-1 h-5 ml-1 bg-wht" blink />
          )}
        </View>
        {/* saving... text */}
        {progress > 0 && (
          <View className="flex-row items-center">
            <ChevronRight className="text-wht" size={14} />
            <Text className="text-wht font-trmnl text-lg">Saving</Text>
            <LoadingDots setLoading={setLoading} />
          </View>
        )}
        {/* Gender Text */}
        {progress > 0 && (!loading || progress > 1) && (
          <View className="flex-row items-center">
            <ChevronRight className="text-wht" size={14} />
            <Text className="text-wht font-trmnl text-lg">
              Gender 🧑: {gender}
            </Text>
            {progress === 1 && (
              <Cursor customStyles="w-1 h-5 ml-1 bg-wht" blink />
            )}
          </View>
        )}
        {/* Saving... Text */}
        {progress > 1 && (
          <View className="flex-row items-center">
            <ChevronRight className="text-wht" size={14} />
            <Text className="text-wht font-trmnl text-lg">Saving</Text>
            <LoadingDots setLoading={setLoading} />
          </View>
        )}
      </View>

      {/* Register card */}
      {progress < 2 && (
        <Card customStyles="w-auto h-64 mb-3 justify-between">
          <Text className="text-wht text-4xl font-jbmbold mb-4">Register</Text>
          <View className="flex-1 justify-around">
            {progress === 0 && (
              <Input
                placeholder="Enter your name"
                customStyles="w-full h-12 font-jbm"
                placeholderTextColor="#a0a2a7"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            )}
            {progress > 0 && (
              <Dropdown
                customStyles="bg-blk justify-between"
                modalCustomStyles="bg-gry-dark"
                options={["Male", "Female"]}
                onSelect={setGender}
                value={gender}
              />
            )}
            <View className="flex-row">
              {progress > 0 && (!loading || progress > 1) && (
                <Button
                  onPress={() => {
                    if (progress === 0 && name === "") return;
                    if (progress === 1 && gender === "") return;

                    setProgress((prev) => prev + 1);
                  }}
                  disabled={loading}
                  customStyles="bg-wht flex-1 mr-1"
                >
                  <ArrowLeft color="black" size={14} />
                  <Text className="font-jbm text-sm">Previous</Text>
                </Button>
              )}
              <Button
                onPress={() => {
                  if (progress === 0 && name === "") return;
                  if (progress === 1 && gender === "") return;

                  setProgress((prev) => prev + 1);
                }}
                disabled={loading}
                customStyles={`bg-wht flex-1 ${
                  progress > 0 && !loading && "ml-1"
                }`}
              >
                <Text className="font-jbm text-sm">Next</Text>
                <ArrowRight color="black" size={14} />
              </Button>
            </View>
            <ProgressBarDashed total={2} fill={progress} />
          </View>
        </Card>
      )}
    </SafeAreaView>
  );
};
