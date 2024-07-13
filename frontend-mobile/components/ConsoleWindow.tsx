import React, { useState, useEffect, useRef } from "react";
import { Text, View, FlatList } from "react-native";

// Console Window Component
interface IData {
  key: string;
  element: React.ReactNode;
}
interface Iprops {
  data: IData[];
  clock: number;
  customStyles?: string;
}

const ConsoleWindow = ({ data, clock, customStyles }: Iprops) => {
  const flatListRef = useRef<FlatList<IData>>(null);

  const renderItem = ({ item, index }: { item: IData; index: number }) => {
    const elementWithProps = React.cloneElement(item.element as any, {
      clock,
      index,
    });
    return elementWithProps;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flatListRef.current)
        flatListRef.current.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <View className={`flex ${customStyles}`}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

// Console Window Text Component
interface ITextProps {
  children: React.ReactNode;
  clock?: number;
  index?: number;
  customStyles?: string;
}

ConsoleWindow.Text = ({ children, clock, customStyles, index }: ITextProps) => {
  if (clock !== undefined && index !== undefined && clock < index) return null;

  return <Text className={`font-trmnl ${customStyles}`}>{children}</Text>;
};

// Console Window Loading Dots Component
interface ILoadingDotsProps {
  loop?: boolean;
  clock?: number;
  index?: number;
  customStyles?: string;
  setLoading?: (value: boolean) => any;
  text?: string;
  cb?: () => any;
}

ConsoleWindow.LoadingDots = ({
  loop = false,
  clock,
  index,
  customStyles,
  text,
  setLoading,
  cb,
}: ILoadingDotsProps) => {
  const [dotsCount, setDotsCount] = useState(0);

  useEffect(() => {
    if (clock !== undefined && index !== undefined && clock < index) return;
    if (!loop) setLoading && setLoading(true);

    const interval = setInterval(() => {
      setDotsCount((prev) => {
        if (prev === 4) {
          if (!loop) clearInterval(interval);
          if (loop) return 0;

          return 4;
        }

        return prev + 1;
      });
    }, 900);

    return () => {
      clearInterval(interval);
    };
  }, [loop, clock, index]);

  useEffect(() => {
    if (dotsCount === 4) {
      if (setLoading) {
        setLoading(false);
        cb && cb();
      }
    }
  }, [dotsCount]);

  if (clock !== undefined && index !== undefined && clock < index) return null;

  return (
    <View className="flex flex-row items-end">
      {text && <Text className={`font-trmnl ${customStyles}`}>{text}</Text>}
      {Array.from({ length: Math.min(dotsCount, 3) }).map((_, i) => (
        <Text className={`font-trmnl ${customStyles}`} key={i}>
          .
        </Text>
      ))}
    </View>
  );
};

// Console Window View Component
interface IViewProps {
  children: React.ReactNode;
  customStyles?: string;
  clock?: number;
  index?: number;
}

ConsoleWindow.View = ({ children, customStyles, clock, index }: IViewProps) => {
  if (clock !== undefined && index !== undefined && clock < index) return null;

  return <View className={`${customStyles}`}>{children}</View>;
};

export default ConsoleWindow;
