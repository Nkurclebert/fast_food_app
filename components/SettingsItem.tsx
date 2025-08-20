import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  detail?: string;
  onPress?: () => void;
  textStyle?: string;
}

const SettingsItem = ({ icon, title, detail, onPress }: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center gap-6 bg-white px-5 py-4 rounded-lg shadow-md mb-4"
    >
      <Image source={icon} className="size-6 pb-5" />

      <View className="flex-1 flex flex-col justify-center">
        <Text className="text-base text-gray-200 ">{title}</Text>
        <Text className="text-lg font-quicksand-bold ">{detail}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
