import { View, Text } from 'react-native'
import tw from "twrnc";
import { Button } from "~/components/ui/Button";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface Props {
  errors?: any;
  setData: (key: string, value: any) => void;
  setContinue: (value: boolean) => void;
}

export default function AddBirthday({ errors, setData, setContinue }: Props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    if (setContinue) {
      setContinue(true);
    }
    setData("birthDate", selectedDate.toISOString());
    setDatePickerVisibility(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <View style={tw`bg-white rounded-lg shadow-md p-5 mb-5`}>
        <Text style={tw`text-gray-700 text-base mt-2 px-5`}>
          Date de naissance sélectionnée:
        </Text>
        <Text style={tw`text-white w-full bg-gray-500 text-center text-base mt-2 px-5 py-2 rounded-lg`}>
          {date.toLocaleDateString('fr-FR')}
        </Text>
        <Text style={tw`text-gray-500 text-xs mt-2 w-full text-center`}>
          Votre enfant a donc {Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365))} ans.
        </Text>
      </View>
      <Button onPress={() => setDatePickerVisibility(true)} >Modifier la date de naissance</Button>
      <Text style={tw`text-gray-500 text-xs mt-2 px-5`}>
        La date de naissance est utilisée pour calculer l'âge de l'enfant et
        pour des fonctionnalités liées à l'âge.
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );

}