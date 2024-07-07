import { View } from "react-native";

interface Iprop {
  children: React.ReactNode;
  customStyles: string;
}

export default ({ children, customStyles }: Iprop) => {
  return (
    <View className={`flex border-2 border-gry rounded-lg p-4 ${customStyles}`}>{children}</View>
  );
};
