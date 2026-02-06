import CustomHeader from "@/components/CustomHeader";
import { icons } from "@/constants";
import { appwriteConfig, databases } from "@/lib/appwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        const document = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.menuCollectionId,
          id
        );
        setMenuItem(document as MenuItem);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FE8C00" />
      </View>
    );
  }

  if (!menuItem) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Menu item not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      className="h-full "
      style={{ flex: 1, backgroundColor: "#FE8C000D" }}
    >
      <View className="pb-6 pt-4 px-7">
        <CustomHeader title="Details" />
      </View>

      <View className="flex-row p-4">
        <View className="flex-1 pr-2">
          <Text className="text-2xl font-bold mb-4">{menuItem.name}</Text>

          <View className="flex-row items-center mb-6">
            {/* Render stars dynamically */}
            {Array.from({ length: 5 }).map((_, index) => {
              const starValue = index + 1;
              const isFullStar = menuItem.rating >= starValue;
              const isHalfStar =
                menuItem.rating >= starValue - 0.5 &&
                menuItem.rating < starValue;

              return (
                <Image
                  key={index}
                  source={
                    isFullStar
                      ? icons.fullStar
                      : isHalfStar
                        ? icons.halfStar
                        : icons.emptyStar
                  }
                  className="w-4 h-4 mr-1"
                  resizeMode="contain"
                />
              );
            })}

            {/* Display the rating text */}
            <Text className="text-base text-gray-600 ml-2">{`${menuItem.rating}/5`}</Text>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-6">
            <Text className="color-white-200">$</Text>
            {menuItem.price.toFixed(2)}
          </Text>

          <View className="flex-row mb-6">
            <View className="pr-2">
              <Text className="text-base text-gray-600">Calories</Text>
              <Text className="text-lg font-bold">{`${menuItem.calories} Cal`}</Text>
            </View>

            <View className="pl-2">
              <Text className="text-base text-gray-600">Protein</Text>
              <Text className="text-lg font-bold">{`${menuItem.protein}g`}</Text>
            </View>
          </View>
        </View>

        <View className="flex-1 pl-2">
          <Image
            source={{ uri: menuItem.image_url }}
            resizeMode="cover"
            className="w-full h-48 rounded-lg"
          />
        </View>
      </View>

      <View className=" bg-white-100  border-white-200 flex-row items-center justify-between pl-4 pr-6 py-3 rounded-full mx-4">
        <View className="flex-row items-center">
          <Image source={icons.dollar} className="size-3 " />
          <Text className=" font-bold ml-2">Free Delivery</Text>
        </View>

        <View className="flex-row items-center ">
          <Image source={icons.clock} className="size-3 " />
          <Text className=" font-bold ml-2">20 - 30 mins</Text>
        </View>

        <View className="flex-row items-center ">
          <Image source={icons.star} className="size-4 " />
          <Text className=" font-bold ml-2">{menuItem.rating}</Text>
        </View>
      </View>
      <View className="mx-4 my-6 ">
        <Text className=" text-lg text-gray-600 mb-2">Ingredients:</Text>
        <Text className="text-xl mb-4">{menuItem.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Details;
