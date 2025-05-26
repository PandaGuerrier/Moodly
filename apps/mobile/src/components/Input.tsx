import React, { useState } from 'react'
import { Pressable, PressableProps, Text, TextInput, View } from 'react-native'

import tw from "twrnc";

const styles = {
  "solid": "bg-neutral-300 border-blue-500 shadow-sm shadow-blue-500 opacity-80 ",
  "outline": "bg-white border-gray-300 ",
};

type ButtonProps = {
  name: string;
  displayName: string;
  variant?: "solid" | "outline";
  disabled?: boolean;
  fullWidth?: boolean;
  setData: (key: string, value: any) => void;
  errors?: any;
} & PressableProps;

export const Input = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  ButtonProps
>(({ variant = "solid", disabled, fullWidth = false, setData, errors, name, displayName }, ref) => {
  const [isClicked, setIsClicked] = useState(false);
  const variantTxt = styles[variant] || styles["solid"];

  return (
      <View style={tw`flex items-center justify-center rounded-full px-4 w-full text-md mt-5 `}>
        <Text style={tw`text-base text-start w-full px-3`}>{displayName}</Text>
        <TextInput style={
          tw`flex items-center justify-center rounded-full py-3 px-2 w-full text-md  ${variantTxt} ${errors[name] ? `border border-red-400 bg-red-200` : ``}`
        } onChangeText={(text) => setData(name, text)}>
          <Text></Text>
        </TextInput>
        {errors[name] && (
            <Text style={tw`text-red-600 text-xs mt-1`}>
              {errors[name]}
            </Text>
        )}
      </View>

  );
});

Input.displayName = "Input";
