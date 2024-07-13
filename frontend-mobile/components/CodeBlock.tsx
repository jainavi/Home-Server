import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

interface IProps {
  command: string;
  language: string;
  customStylesTile?: string;
  customStylesBody?: string;
}

export default ({
  command,
  language,
  customStylesTile,
  customStylesBody,
}: IProps) => {
  return (
    <View className="rounded-md overflow-hidden">
      <Text className={`p-2 ${customStylesTile}`}>{language}</Text>
      <Text className={`p-3 ${customStylesBody}`}>{command}</Text>
    </View>
  );
};
