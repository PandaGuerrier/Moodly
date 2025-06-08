import { View, Text, Image } from "react-native";
import { AvatarSelect } from "~/components/AvatarSelect";
import tw from "twrnc";
import React from "react";

interface Props {
  errors?: any;
  setData: (key: string, value: any) => void;
}

const avatarOptions = [
  { label: "Sanglier", value: "sanglier" },
  { label: "Cochon", value: "pig" },
  { label: "Lion", value: "lion" },
  { label: "Lémurien", value: "lemurien" },
];

export default function AddAvatar({ errors, setData }: Props) {
  const [actual, setActual] = React.useState("sanglier");

  const handleAvatarChange = (avatar: string) => {
    setActual(avatar);
    setData("avatar", avatar);
  };

  // @ts-ignore
  return (
    <View style={tw`items-center`}>
      {/* Current avatar centered and enlarged */}
      <View style={tw`items-center mb-6`}>
        <Text>
          Avatar actuel :{" "}
          <Text style={tw`text-blue-500 font-bold`}>{avatarOptions.find(avatar => avatar.value === actual)?.label || actual}</Text>
        </Text>
        <Image
          style={tw`w-36 h-36 rounded-full border-2 border-white`}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/uploads/avatars/${actual}.png`,
          }}
        />
        <Text style={tw`text-gray-500 text-lg font-bold mt-2`}>
          Sélectionnez un avatar
        </Text>
      </View>

      {/* Avatar options in a grid with max 4 per row */}
      <View style={tw`flex-row flex-wrap justify-center`}>
        {avatarOptions.map((avatar) => (
          <View key={avatar.value} style={tw`m-2`}>
            <AvatarSelect
              actual={avatar.value}
              onPress={() => handleAvatarChange(avatar.value)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
