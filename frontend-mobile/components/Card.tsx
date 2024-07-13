import { View } from "react-native";

interface Iprop {
  children: React.ReactNode;
  customStyles: string;
  dashed?: boolean;
}

export default ({ children, customStyles, dashed = false }: Iprop) => {
  return (
    <View
      className={`flex border-2 border-gry ${
        dashed ? "border-dashed" : "rounded-lg"
      } p-4 ${customStyles}`}
    >
      {children}
    </View>
  );
};
