import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect, router } from "expo-router";
import { Text, View } from "react-native";

import Button from "@/components/Button";
import Card from "@/components/Card";
import CodeBlock from "@/components/CodeBlock";
import CW from "@/components/ConsoleWindow";

export default () => {
  const [tClock, settClock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [CWElements, setCWElements] = useState<
    { key: string; element: React.ReactElement }[]
  >([]);

  const addCWElement = (newElement: React.ReactElement) => {
    setCWElements((prev) => [
      ...prev.map(({ key, element: ele }) => ({
        key,
        element: React.cloneElement(ele, {
          ...ele.props,
          loop: false,
          setLoading: undefined,
          cb: undefined,
        }),
      })),
      {
        key: `${prev.length + 1}`,
        element: newElement,
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      settClock((prev) => prev + 1);
      addCWElement(
        <CW.LoadingDots text="> Waiting" customStyles="text-wht text-xl" loop />
      );
    }, [])
  );

  return (
    <View className="bg-blk h-full p-4 pt-4">
      <CW customStyles="w-full h-32 mb-8" clock={tClock} data={CWElements} />
      <View className="flex w-full h-full">
        {/* Row 1 */}
        <View className="flex flex-row h-56">
          {/* Print Command Card */}
          <Card customStyles="flex-1 mr-2 justify-between">
            <Text className="text-wht text-xl font-jbmbold mb-5">Print</Text>
            <CodeBlock
              command="lp -a <file>"
              language=">_ Sh"
              customStylesTile="text-wht font-jbm bg-gry"
              customStylesBody="bg-gry-dark text-white font-jbm"
            />
            <Button
              customStyles="bg-wht mt-2"
              onPress={() => {
                addCWElement(
                  <CW.LoadingDots
                    text="> Executing command: lp -a <file>"
                    customStyles="text-wht text-xl"
                    setLoading={setLoading}
                    cb={() => router.navigate("/home/print")}
                  />
                );
                settClock((prev) => prev + 1);
              }}
              disabled={loading}
            >
              <Text className="font-jbm">Run</Text>
            </Button>
          </Card>
          {/* Coming Soon... Card */}
          <Card customStyles="flex-1 ml-2 justify-center items-center">
            <Text className="text-gry-light font-jbmitalic">Coming Soon!</Text>
          </Card>
        </View>
      </View>
    </View>
  );
};
