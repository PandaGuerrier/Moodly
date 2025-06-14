import React, { useState } from "react";
import { Pressable, PressableProps, Text } from "react-native";
import tw from "twrnc";
import * as Haptics from "expo-haptics";

const styles = {
  solid: "bg-blue-500 border-blue-500 shadow-sm shadow-blue-500 ",
  outline:
    "bg-white border border-gray-300 text-black shadow-sm shadow-gray-300 ",
  danger: "bg-red-500 border-red-500 shadow-sm shadow-red-500 ",
  success: "bg-green-500 border-green-500 shadow-sm shadow-green-500 ",
};

type ButtonProps = {
  onPress?: () => void;
  variant?: "solid" | "outline" | "danger" | "success";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
} & PressableProps;

export const Button = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      onPress,
      variant = "solid",
      disabled,
      children,
      fullWidth = false,
      className = " ",
    },
    ref,
  ) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
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
          `flex-row items-center justify-center rounded-full py-4 px-6 text-lg  ` +
            (variant === "solid" ? styles.solid : " ") +
            (variant === "outline" ? styles.outline : " ") +
            (variant === "danger" ? styles.danger : " ") +
            (variant === "success" ? styles.success : " ") +
            (fullWidth ? "w-full " : " ") +
            (isClicked ? "scale-95 " : " ") +
            (disabled ? "opacity-50 " : " ") +
            ` ${className}`,
        )}
        disabled={disabled}
      >
        <Text
          style={tw`text-base text-center font-semibold text-white ${variant === "outline" ? `text-black` : ` `} ${fullWidth ? `w-full` : ` `}`}
        >
          {children}
        </Text>
      </Pressable>
    );
  },
);

Button.displayName = "Button";
