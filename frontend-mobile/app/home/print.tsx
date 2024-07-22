import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView, Modal } from "react-native";
import { CirclePlus, FileText, X } from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { startActivityAsync } from "expo-intent-launcher";

import Card from "@/components/Card";
import { toTitleCase, truncateString } from "@/utils/helper-functions";
import Button from "@/components/Button";
import { IPrintOptions } from "@/utils/types";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import { PrintQuality, SocketEvents } from "@/utils/enums";
import { useSocket } from "@/context/SocketContext";

const PressableCard = ({
  children,
  onPress,
  dashed,
  active,
  onDelete,
}: {
  children: React.ReactNode;
  onPress: () => any;
  dashed?: boolean;
  active?: boolean;
  onDelete?: () => any;
}) => (
  <TouchableOpacity onPress={onPress} className="basis-[48%] h-48 mb-4">
    <Card
      customStyles={`justify-around items-center h-full ${
        active && "border-wht"
      }`}
      dashed={dashed}
    >
      {!dashed && (
        <X
          onPress={() => onDelete && onDelete()}
          className="absolute z-10 top-2 right-2 text-gry-light"
        />
      )}
      {children}
    </Card>
  </TouchableOpacity>
);

export default () => {
  const { socket } = useSocket();

  const [documents, setDocuments] = useState<
    DocumentPicker.DocumentPickerSuccessResult[]
  >([]);
  const [currentPrintJobs, setCurrentPrintJobs] = useState<string[]>([]);
  const [printOptions, setPrintOptions] = useState<IPrintOptions[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: "*/*",
    });
    if (result.assets === null) return;

    setDocuments([...documents, result]);
    setPrintOptions([
      ...printOptions,
      { numberOfCopies: 1, quality: "normal", toLandScape: false, pages: "" },
    ]);
  };

  const handleDocumentView = async (
    document: DocumentPicker.DocumentPickerSuccessResult
  ) => {
    const content = await FileSystem.getContentUriAsync(document.assets[0].uri);
    try {
      await startActivityAsync("android.intent.action.VIEW", {
        data: content,
        flags: 1,
        type: document.assets[0].mimeType,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePrint = async () => {
    for (let i = 0; i < documents.length; i++) {
      let baseUrl = `${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/print?`;
      const document = documents[i];
      Object.keys(printOptions[i]).forEach((key) => {
        baseUrl += `${key}=${(printOptions as any)[i][key]}&`;
      });

      try {
        await FileSystem.uploadAsync(baseUrl, document.assets[0].uri, {
          fieldName: "upload",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        });
      } catch (e) {
        console.log(e);
        break;
      }
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvents.printJobStatus, (data: string[]) => {
      setCurrentPrintJobs(data);
    });

    return () => {
      socket.off(SocketEvents.printJobStatus);
    };
  }, [socket]);

  return (
    <View className="relative bg-blk h-full p-4 pt-4">
      {/* <Modal visible animationType="slide" transparent /> */}
      <ScrollView className="h-full">
        {/* Documents View */}
        <View className="flex-row flex-wrap w-full justify-between">
          {/* Selected Documents View */}
          {documents.map((document, index) => (
            <PressableCard
              key={index}
              onPress={() => {
                setActiveIndex(index);
              }}
              onDelete={() => {
                setActiveIndex(null);
                setDocuments((prev) => {
                  const newDocuments = [...prev];
                  newDocuments.splice(index, 1);
                  return newDocuments;
                });
                setPrintOptions((prev) => {
                  const newOptions = [...prev];
                  newOptions.splice(index, 1);
                  return newOptions;
                });
              }}
              active={activeIndex === index}
            >
              <FileText width={36} height={36} className="text-gry-light" />
              <Text className="text-gry-light">
                {truncateString(document.assets[0].name, 15)}
              </Text>
              <Button
                onPress={() => handleDocumentView(document)}
                customStyles="bg-wht w-full"
              >
                <Text>View</Text>
              </Button>
            </PressableCard>
          ))}
          {/* Document Picker */}
          <PressableCard onPress={handleDocumentPick} dashed>
            <CirclePlus width={36} height={36} className="text-gry-light w-" />
          </PressableCard>
          {/* Extra Invisible Cards to Correct the Layout */}
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index} className="basis-[48%] h-32"></View>
          ))}
        </View>
      </ScrollView>

      {/* Print Options View */}
      {activeIndex !== null && (
        <Card customStyles="absolute bottom-10 left-[10%] right-[10%] justify-between w-auto h-60 border-wht bg-blk">
          <X
            onPress={() => setActiveIndex(null)}
            className="absolute z-10 top-2 right-2 text-gry-light"
          />
          {/* Copies Selection */}
          <View className="flex-row justify-between items-center mt-6">
            <Text className="text-wht font-jbm">Copies:</Text>
            <Dropdown
              customStyles="bg-blk"
              modalCustomStyles="bg-gry-dark"
              options={Array.from({ length: 10 }, (_, index) =>
                (index + 1).toString()
              )}
              onSelect={(selectedItem) => {
                setPrintOptions((prev) => {
                  const newOptions = [...prev];
                  newOptions[activeIndex].numberOfCopies =
                    parseInt(selectedItem);
                  return newOptions;
                });
              }}
              value={printOptions[activeIndex].numberOfCopies.toString()}
            />
          </View>
          {/* Pages Selection */}
          <View className="flex-row justify-between items-center">
            <Text className="text-wht font-jbm">Pages:</Text>
            <Input
              customStyles="w-[40%] h-10 py-1 font-jbm"
              placeholder="1, 2-5, 3"
              placeholderTextColor="gray"
              value={printOptions[activeIndex].pages}
              onChangeText={(text) => {
                setPrintOptions((prev) => {
                  const newOptions = [...prev];
                  newOptions[activeIndex].pages = text;
                  return newOptions;
                });
              }}
            />
          </View>
          {/* Quality Selection */}
          <View className="flex-row justify-between items-center">
            <Text className="text-wht font-jbm">Quality:</Text>
            <Dropdown
              customStyles="bg-blk"
              modalCustomStyles="bg-gry-dark"
              options={["draft", "normal", "best"]}
              onSelect={(selectedItem) => {
                setPrintOptions((prev) => {
                  const newOptions = [...prev];
                  newOptions[activeIndex].quality =
                    selectedItem as keyof typeof PrintQuality;
                  return newOptions;
                });
              }}
              value={toTitleCase(printOptions[activeIndex].quality)}
            />
          </View>
          {/* Orientation Selection */}
          <View className="flex-row justify-between items-center">
            <Text className="text-wht font-jbm">Orientation:</Text>
            <Dropdown
              customStyles="bg-blk"
              modalCustomStyles="bg-gry-dark"
              options={["Portrait", "Landscape"]}
              onSelect={(selectedItem) => {
                setPrintOptions((prev) => {
                  const newOptions = [...prev];
                  newOptions[activeIndex].toLandScape =
                    selectedItem === "Landscape";
                  return newOptions;
                });
              }}
              value={
                printOptions[activeIndex].toLandScape ? "Landscape" : "Portrait"
              }
            />
          </View>
        </Card>
      )}
      {/* Print Button */}
      {activeIndex === null && documents.length > 0 && (
        <Button
          customStyles={`absolute bottom-${
            currentPrintJobs.length > 0 ? "24" : "10"
          } left-[10%] right-[10%] h-12 bg-wht`}
          onPress={() => handlePrint()}
        >
          <Text className="font-jbmbold">Print</Text>
        </Button>
      )}
      {/* Print Job Status View */}
      {currentPrintJobs.length > 0 && (
        <Card customStyles="flex-row items-center justify-between absolute bottom-5 left-[10%] right-[10%] h-16 bg-blk">
          <Text className="text-wht font-jbm">
            File(s) in Queue: {currentPrintJobs.length}
          </Text>
          <Button
            customStyles="w-30 h-12 border-gry border-2"
            onPress={() => {
              fetch(`${process.env.EXPO_PUBLIC_SERVER_BASE_URL}/print/cancel`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }}
          >
            <Text className="font-jbm text-wht">Cancel</Text>
          </Button>
        </Card>
      )}
    </View>
  );
};
