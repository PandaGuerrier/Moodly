import React, { useState } from "react";
import {
  Image,
  Pressable,
  PressableProps,
  Text,
  View,
  StyleSheet,
} from "react-native";

import tw from "twrnc";
import * as Haptics from "expo-haptics";

type AvatarProps = {
  onPress?: () => void;
  disabled?: boolean;
  title?: string;
  imageUrl: string;
} & PressableProps;

export const Avatar = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  AvatarProps
>(({ onPress, disabled, title, imageUrl }, ref) => {
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
        onPressIn={() => setIsClicked(true)}
        onPressOut={() => setIsClicked(false)}
        className={"duration"}
        style={tw.style(
          `rounded-full ` +
            (isClicked ? "scale-95 " : " ") +
            (disabled ? "opacity-50" : "opacity-100"),
        )}
        disabled={disabled}
      >
        <Image
          style={tw`w-24 h-24 rounded-full border-2 border-white`}
          source={{
            uri: imageUrl,
          }}
        />
        <Text style={tw`text-center text-base font-semibold text-white `}>
          {title || " "}
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
