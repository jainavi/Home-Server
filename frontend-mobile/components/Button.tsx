import { Button, TouchableOpacity } from "react-native";

interface IProps {
  onPress: (...args: any[]) => any;
  children: React.ReactNode;
  customStyles: string;
  disabled?: boolean;
}

export default ({
  onPress,
  customStyles,
  disabled = false,
  children,
}: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-lg flex-row justify-center items-center p-3 ${customStyles}`}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};
