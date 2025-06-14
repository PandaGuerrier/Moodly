import React, { useState } from "react";
import { Image, Pressable, PressableProps, View } from "react-native";

import tw from "twrnc";
import * as Haptics from "expo-haptics";

type AvatarProps = {
  onPress: (avatar: string) => void;
  actual: string;
} & PressableProps;

export const AvatarSelect = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  AvatarProps
>(({ onPress, actual }, ref) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View>
      <Pressable
        ref={ref}
        onPress={async () => {
          await Haptics.selectionAsync();
          if (onPress) {
            onPress(actual);
          }
        }}
        onPressIn={() => setIsClicked(true)}
        onPressOut={() => setIsClicked(false)}
        className={"duration"}
        style={tw.style(`rounded-full ` + (isClicked ? "scale-95 " : " "))}
      >
        <Image
          style={tw`w-24 h-24 rounded-full border-2 border-white`}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/avatars/${actual}.png`,
          }}
        />
      </Pressable>
    </View>
  );
});

AvatarSelect.displayName = "Avatar";