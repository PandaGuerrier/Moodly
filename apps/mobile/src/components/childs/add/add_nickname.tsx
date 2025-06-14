import { Text, View } from "react-native";
import { Input } from "~/components/ui/Input";
import tw from "twrnc";

interface Props {
  errors?: any;
  setData: (key: string, value: any) => void;
  setContinue?: (value: boolean) => void;
}

export default function AddNickname({ errors, setData, setContinue }: Props) {
  const handleChange = (key: string, value: string) => {
    console.log(value);
    setData("nickname", value);
    if (setContinue) {
      setContinue(value.length > 0);
    }
  };

  return (
    <View>
      <Input
        name="nickname"
        displayName="Surnom"
        variant="solid"
        setData={handleChange}
        errors={errors}
      />
      <Text style={tw`text-gray-500 text-xs mt-2 px-5`}>
        Le surnom est utilisé pour identifier l'enfant dans l'application.
      </Text>
    </View>
  );
}