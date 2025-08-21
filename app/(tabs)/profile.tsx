import SettingsItem from "@/components/SettingsItem";
import { icons, images } from "@/constants";
import { logout } from "@/lib/appwrite";
import { CustomButtonProps } from "@/type";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditButton = ({ onPress, textStyle, style }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "custom-btn bg-white-100 border border-white-200 mb-5 mt-3",
        style
      )}
      onPress={onPress}
    >
      <View className="flex-center flex-row">
        <Text className={cn("text-white-200 font-bold", textStyle)}>
          Edit Profile
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const LogOutButton = ({ onPress, textStyle, style }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn("custom-btn  border border-red-500 bg-red-200", style)}
      onPress={onPress}
    >
      <View className="flex-center flex-row">
        <Image source={icons.logout} className="size-5 mr-2" />
        <Text
          className={cn(
            "text-red-500 text- paragraph-semibold font-bold",
            textStyle
          )}
        >
          Log Out
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Profile = () => {
  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      router.push("/(auth)/sign-in");
    } else {
      Alert.alert("Error", "An error occured while logging out");
    }
  };
  return (
    <SafeAreaView
      className=" h-full"
      style={{ flex: 1, backgroundColor: "#FE8C000D" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={images.arrowBack}
              className="size-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-7" />
        </View>

        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={images.avatar2}
              className="size-36 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-0 right-0">
              <Image source={icons.pen} className="size-14" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col mt-14">
          <SettingsItem
            icon={icons.user}
            title="Full Name"
            detail="Clebert Nkuranga"
          />
          <SettingsItem
            icon={icons.envelope}
            title="Email"
            detail="nkurclebert@gmail.com"
          />
          <SettingsItem
            icon={icons.phone}
            title="Phone Number"
            detail="+250 788 123 456"
          />
          <SettingsItem
            icon={icons.location}
            title="Address 1 - (Home)"
            detail="123 Main Street, Kigali, Rwanda"
          />
          <SettingsItem
            icon={icons.location}
            title="Address 2 - (Work)"
            detail="456 Office Park, Kigali, Rwanda"
          />
        </View>

        <EditButton />
        <LogOutButton onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
