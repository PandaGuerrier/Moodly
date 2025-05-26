import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "~/components/Button";
import { useForm } from "~/utils/api/form";
import tw from "twrnc";
import { Input } from "~/components/Input";
import { useRouter } from "expo-router";
import Child from "~/models/child";
import User from "~/models/user";

interface AddChildComponentProps {
  children: React.ReactNode;
  user?: User; // Optional user prop for logout functionality
}

export default function AddChildComponent({
  children,
  user
}: AddChildComponentProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const { setData, errors, getData, setErrors } = useForm();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const router = useRouter();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleConfirm = (date: any) => {
    setDate(date);
    setDatePickerVisibility(false);
  };

  const sendData = async () => {
    console.log("Sending data...");
    const firstName = getData("firstName");
    console.log("First name:", firstName);
    const lastName = getData("lastName");

    if (!firstName || !lastName) {
      setErrors({
        firstName: !firstName ? "Le prénom est requis." : undefined,
        lastName: !lastName ? "Le nom de famille est requis." : undefined,
      });
      return;
    }

    const birthDate = date.toISOString();
    const nickname = getData("nickname") || undefined;

    console.log("Data from form: ", {
      firstName,
      lastName,
      birthDate,
      nickname,
    });

    const child = Child.getEmpty(firstName, lastName, nickname, date);
    console.log("Child to be created:", child);
    const user = await User.getCurrentUser();
    if (!user) {
      setErrors({
        global:
          "L'utilisateur n'as pas été trouvé, veuillez vous reconnecter, ou contacter le support si le problème persiste.",
      });
      console.error("User not found");
      router.push("/");
      return;
    }

    await user.addChild(child);
    router.push("/");
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View style={tw`py-14 px-4`}>
          <ScrollView>
            <Text style={tw`text-2xl text-blue-600`}>Vos enfants :</Text>
            {children}
          </ScrollView>
          <View style={tw`p-4 mb-16`}>
            <Button onPress={handlePresentModalPress}>Ajouter un enfant</Button>
            <Button
                className={`mt-4`}
                variant={"danger"}
                onPress={async () => {
                  console.log("Logout pressed");
                  await user!.logout();
                  router.push("/");
                }}>Déconnexion</Button>
          </View>
        </View>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["85%"]}>
          <BottomSheetView style={styles.contentContainer}>
            <Text style={tw`text-2xl text-blue-600`}>Ajouter un enfant !</Text>
            {errors.global && (
              <Text style={tw`text-red-600 text-center`}>{errors.global}</Text>
            )}
            <View style={tw`w-full mt-5`}>
              <Input
                name={"firstName"}
                displayName={"Prénom"}
                setData={setData}
                errors={errors}
              />
              <Input
                name={"lastName"}
                displayName={"Nom de famille"}
                setData={setData}
                errors={errors}
              />
              <Input
                name={"nickname"}
                displayName={"Surnom"}
                setData={setData}
                errors={errors}
              />
              <View style={tw`p-4`}>
                <Button
                  variant={"outline"}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  Ajouter la date de naissance
                </Button>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={() => setDatePickerVisibility(false)}
                />
                <Text style={tw`text-center`}>
                  Date de naissance séléctionnée :{" "}
                  {date.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </Text>
                <Button onPress={() => sendData()}>Enregister !</Button>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
