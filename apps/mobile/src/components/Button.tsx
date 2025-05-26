import React, { useEffect, useState } from 'react'
import { Pressable, PressableProps, Text, View } from "react-native";

import { cn } from "~/utils/cn";
import tw from "twrnc";
import * as Haptics from 'expo-haptics'

const styles = {
  solid: "bg-blue-500 border-blue-500 shadow-sm shadow-blue-500 ",
  outline: "bg-white border border-gray-300 text-black shadow-sm shadow-gray-300 ",
  danger: "bg-red-500 border-red-500 shadow-sm shadow-red-500 ",
};

type ButtonProps = {
  onPress?: () => void;
  variant?: "solid" | "outline" | "danger";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
} & PressableProps;

export const Button = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  ButtonProps
>(({ onPress, variant = "solid", disabled, children, fullWidth = false, className = ' ' }, ref) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View>
      <Pressable
        ref={ref}
        onPress={async () => {
          await Haptics.selectionAsync()
          if (onPress) {
            onPress();
          }
        }}
        onPressIn={() => setIsClicked(true)}
        onPressOut={() => setIsClicked(false)}
        className={'duration'}
        style={tw.style(
          `flex-row items-center justify-center rounded-full py-4 px-6 text-lg  ` +
            (variant === "solid" ? styles.solid : ' ') +
            (variant === "outline" ? styles.outline : ' ') +
            (variant === "danger" ? styles.danger : ' ') +
            (fullWidth ? "w-full " : ' ') +
            (isClicked ? "scale-95 " : ' ') +
            (disabled ? "opacity-50 " : " ") + ` ${className}`,
        )}
        disabled={disabled}
      >
        <Text
          style={tw`text-base font-semibold text-white ${variant === "outline" ? `text-black` : ` `}`}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
});

Button.displayName = "Button";
