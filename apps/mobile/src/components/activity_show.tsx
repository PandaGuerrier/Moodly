import React, { useEffect, useState } from 'react'
import { Pressable, PressableProps, Text, View } from "react-native";

import { cn } from "~/utils/cn";
import tw from "twrnc";
import * as Haptics from 'expo-haptics'
import { DefaultActivity } from '~/models/activity'
import { useRouter } from 'expo-router'

interface ActivityShowProps {
  activity: DefaultActivity
}

export default function ActivityShow ({ activity }: ActivityShowProps) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

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
          `flex-row items-center justify-center py-4 px-6 text-lg rounded-lg border border-gray-500 bg-gray-600 ` +
            (isClicked ? "scale-95 " : ' ')
        )}
      >
        <Text
          style={tw`w-full text-base text-center font-semibold text-white `}>
          {activity.name}
        </Text>
      </Pressable>
    </View>
  );
};