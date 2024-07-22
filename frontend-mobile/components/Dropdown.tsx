import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { ChevronDown, X } from "lucide-react-native";

import { PrintQuality } from "@/utils/enums";
import { toTitleCase } from "@/utils/helper-functions";

interface IProp {
  value?: string;
  customStyles: string;
  modalCustomStyles: string;
  options: string[];
  onSelect: (arg: string) => void;
}

export default ({
  value,
  modalCustomStyles,
  customStyles,
  options,
  onSelect,
}: IProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <View
          className={`absolute bottom-0 w-full h-[30%] rounded-lg p-4 ${modalCustomStyles}`}
        >
          <X
            onPress={() => setIsOpen(false)}
            className="absolute z-10 top-4 right-4 text-gry-light"
          />
          <FlatList
            data={options}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            renderItem={({ item, index }) => (
              <View className="items-center">
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setSelected(toTitleCase(item));
                    setIsOpen(false);
                  }}
                >
                  <Text className="text-xl mb-4 font-jbm text-wht">
                    {toTitleCase(item)}
                  </Text>
                </TouchableOpacity>
                {index === options.length - 1 ? null : (
                  <View className="w-5 h-[2px] mb-4 rounded-full bg-gry-light" />
                )}
              </View>
            )}
          />
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <View
          className={`flex-row items-center border-2 border-gry rounded-lg p-2 ${customStyles}`}
        >
          <Text className="text-wht">{value || selected}</Text>
          <ChevronDown className="text-wht ml-2" />
        </View>
      </TouchableOpacity>
    </>
  );
};
