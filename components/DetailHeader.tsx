import { images } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
}

const DetailHeader = ({ title }: Props) => {
  const router = useRouter();

  return (
    <View className="custom-header">
      <TouchableOpacity onPress={() => router.back()}>
        <Image
          source={images.arrowBack}
          className="size-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text className="base-semibold text-dark-100">{title}</Text>
    </View>
  );
};

export default DetailHeader;
