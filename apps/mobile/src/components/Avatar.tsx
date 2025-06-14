import React, { useState } from "react";
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

import tw from "twrnc";
import * as Haptics from "expo-haptics";

type AvatarProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  title: string;
  imageUrl: string;
} & PressableProps;

export const Avatar = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  AvatarProps
>(({ onPress, onLongPress, disabled, title, imageUrl }, ref) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View>
      <Pressable
        ref={ref}
        onPress={async () => {
          await Haptics.selectionAsync();
          if (onPress) {
            onPress();
          }
        }}
        onLongPress={async () => {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          if (onLongPress) {
            onLongPress();
          }
        }}
        onPressIn={() => setIsClicked(true)}
        onPressOut={() => setIsClicked(false)}
        className={"duration"}
        style={tw.style(
          `rounded-full w-full ` +
            (isClicked ? "scale-95 " : " ") +
            (disabled ? "opacity-50" : "opacity-100"),
        )}
        disabled={disabled}
      >
        <Image
          style={tw`w-28 h-28 rounded-full`}
          source={{
            uri: imageUrl,
          }}
        />
        <Text
          style={tw`text-center text-base font-semibold text-white w-full `}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
});

Avatar.displayName = "Avatar";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
