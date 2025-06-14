import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import * as Haptics from "expo-haptics";
import { DefaultActivity } from "~/models/activity";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

interface ActivityShowProps {
  activity: DefaultActivity;
  right?: boolean;
}

// Function to get color based on activity type
const getActivityColor = (type: string) => {
  switch (type) {
    case "photo":
      return "blue";
    case "calcul":
      return "green";
    case "dictee":
      return "purple";
    case "audio":
      return "orange";
    default:
      return "gray";
  }
};

// Function to get icon based on activity type
const getActivityIcon = (type: string) => {
  switch (type) {
    case "photo":
      return "camera";
    case "calcul":
      return "calculator";
    case "dictee":
      return "pencil";
    case "audio":
      return "headphones";
    default:
      return "star";
  }
};

export default function ActivityShow({
  activity,
  right = false,
}: ActivityShowProps) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const activityColor = getActivityColor(activity.type);
  const activityIcon = getActivityIcon(activity.type);

  return (
    <View
      style={tw`flex flex-col w-full p-4 ${right ? "items-end" : "items-start"}`}
    >
      <View style={tw`flex flex-col items-center justify-center`}>
        <Pressable
          onPress={async () => {
            await Haptics.selectionAsync();
            router.push(`/activities/${activity.id}`);
          }}
          onPressIn={() => setIsClicked(true)}
          onPressOut={() => setIsClicked(false)}
          style={tw.style(
            `flex-row items-center justify-between text-lg rounded-full shadow-md ` +
              (isClicked ? "scale-95 " : " "),
          )}
        >
          <View style={tw`bg-${activityColor}-500 p-6 rounded-full`}>
            <FontAwesome
              name={activityIcon}
              size={48}
              style={tw`text-${activityColor}-200`}
            />
          </View>
        </Pressable>
        <Text
          style={tw`text-base font-semibold text-${activityColor}-300 mt-2`}
        >
          {activity.name}
        </Text>
      </View>
    </View>
  );
}
