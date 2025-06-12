import React, { useEffect, useState } from 'react'
import { Pressable, PressableProps, Text, View } from "react-native";

import { cn } from "~/utils/cn";
import tw from "twrnc";
import * as Haptics from 'expo-haptics'
import { DefaultActivity } from '~/models/activity'
import { useRouter } from 'expo-router'
import { FontAwesome } from "@expo/vector-icons";

interface ActivityShowProps {
  activity: DefaultActivity
}

// Function to get color based on activity type
const getActivityColor = (type: string) => {
  switch(type) {
    case 'photo':
      return 'bg-blue-600 border-blue-500';
    case 'calcul':
      return 'bg-green-600 border-green-500';
    case 'dictee':
      return 'bg-purple-600 border-purple-500';
    case 'audio':
      return 'bg-orange-600 border-orange-500';
    default:
      return 'bg-gray-600 border-gray-500';
  }
};

// Function to get icon based on activity type
const getActivityIcon = (type: string) => {
  switch(type) {
    case 'photo':
      return 'camera';
    case 'calcul':
      return 'calculator';
    case 'dictee':
      return 'pencil';
    case 'audio':
      return 'headphones';
    default:
      return 'star';
  }
};

export default function ActivityShow ({ activity }: ActivityShowProps) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const activityColor = getActivityColor(activity.type);
  const activityIcon = getActivityIcon(activity.type);

  return (
    <View>
      <Pressable
        onPress={async () => {
          await Haptics.selectionAsync()
          router.push(`/activities/${activity.id}`)
        }}
        onPressIn={() => setIsClicked(true)}
        onPressOut={() => setIsClicked(false)}
        style={tw.style(
          `flex-row items-center justify-between py-4 px-6 text-lg rounded-lg border ${activityColor} shadow-md ` +
            (isClicked ? "scale-95 " : ' ')
        )}
      >
        <View style={tw`flex-row items-center`}>
          <View style={tw`mr-3 bg-white/20 p-2 rounded-full`}>
            <FontAwesome name={activityIcon} size={18} color="#ffffff" />
          </View>
          <Text
            style={tw`text-base font-semibold text-white`}>
            {activity.name}
          </Text>
        </View>
        <FontAwesome name="chevron-right" size={14} color="#ffffff" />
      </Pressable>
    </View>
  );
};
