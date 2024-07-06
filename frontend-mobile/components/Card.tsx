import { View } from "react-native";

interface Iprop {
  children: React.ReactNode;
}

export default ({ children }: Iprop) => {
  // card in shadcn style

  return <View className="bg-gry rounded-md">{children}</View>;
};
