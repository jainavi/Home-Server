import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { styled } from "nativewind";

interface IProps {
  blink?: boolean;
  customStyle: string;
}

export default ({ blink, customStyle }: IProps) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const trnsTm = 0,
      delay = 500;

    const blinkAnm = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: trnsTm,
          useNativeDriver: true,
        }),
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: trnsTm,
          useNativeDriver: true,
        }),
        Animated.delay(delay),
      ])
    );

    if (blink) blinkAnm.start();

    return () => blinkAnm.stop();
  }, [opacity]);

  const StyledView = styled(Animated.View);

  return <StyledView className={customStyle} style={{ opacity }} />;
};
