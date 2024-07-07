import { FlatList, View } from "react-native";

interface IProps {
  total: number;
  fill: number;
}

export default ({ total, fill }: IProps) => {
  const data = Array.from({ length: total }, (_, i) => ({
    key: String(i),
    fill: i < fill,
  }));

  return (
    <View className={`flex-row w-full`}>
      {data.map((item, i) => (
        <View
          key={item.key}
          className={`flex-1 h-1 rounded-full ${
            i === 0 ? "mr-1" : i === data.length - 1 ? "ml-1" : "mx-1"
          } ${item.fill ? "bg-wht" : "bg-gry"}`}
        />
      ))}
    </View>
  );
};
