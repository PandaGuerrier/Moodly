import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Button } from "~/components/ui/Button";
import { useForm } from "~/utils/api/form";
import tw from "twrnc";
import { useRouter } from "expo-router";
import Child from "~/models/child";
import User from "~/models/user";
import AddNickname from "~/components/childs/add/add_nickname";
import AddBirthday from "~/components/childs/add/add_birthday";
import AddAvatar from "~/components/childs/add/add_avatar";

interface AddChildComponentProps {
  children: React.ReactNode;
  user?: User; // Optional user prop for logout functionality
  showAddButton?: boolean; // Optional prop to control visibility of add button
}

export default function AddChildComponent({
  children,
  user,
  showAddButton = true, // Default to true if not provided
}: AddChildComponentProps) {
  const [active, setActive] = useState(0);
  const [canContinue, setContinue] = useState(false);
  const { setData, errors, getData, setErrors } = useForm();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const router = useRouter();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const sendData = async () => {
    console.log("Sending data...");
    const birthDate = getData("birthDate")
      ? new Date(getData("birthDate"))
      : new Date();
    const nickname = getData("nickname");
    const avatar = getData("avatar") || "sanglier";

    console.log("Data from form: ", {
      birthDate,
      nickname,
      avatar,
    });

    const child = Child.getEmpty(nickname, birthDate, avatar);
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

  const content = [
    <AddNickname errors={errors} setContinue={setContinue} setData={setData} />,
    <AddBirthday setData={setData} setContinue={setContinue} errors={errors} />,
    <AddAvatar setData={setData} errors={errors} />,
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <SafeAreaView style={tw`px-4`}>
          <View style={tw`h-1/3 p-4 justify-end`}></View>
          <View style={tw`h-1/3 p-4 justify-end`}>{children}</View>
          <View style={tw`h-1/3 p-4 justify-end`}>
            {showAddButton && (
              <Button onPress={handlePresentModalPress}>
                Ajouter un enfant
              </Button>
            )}
            <Button
              className={`${showAddButton ? "mt-4" : ""}`}
              variant={"danger"}
              fullWidth
              onPress={async () => {
                console.log("Logout pressed");
                await user!.logout();
                router.push("/");
              }}
            >
              Déconnexion
            </Button>
          </View>
        </SafeAreaView>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["85%"]}>
          <BottomSheetView style={tw`flex-1 bg-white p-4`}>
            <View>
              <Text style={tw`text-2xl font-bold text-center mb-4`}>
                Ajouter un enfant
              </Text>
              <View style={tw`h-[50%]`}>{content[active]}</View>
              <View
                style={tw`flex-row justify-between items-center mt-4 h-[50%]`}
              >
                {active === content.length - 1 ? (
                  <View style={tw`flex-row w-full`}>
                    <Button
                      className={"flex-1 mr-1"}
                      variant={"outline"}
                      fullWidth
                      onPress={() => setActive(active - 1)}
                    >
                      Retour
                    </Button>
                    <Button
                      className={"flex-1 ml-1"}
                      onPress={sendData}
                      fullWidth
                    >
                      Terminer
                    </Button>
                  </View>
                ) : active === 0 ? (
                  <Button
                    fullWidth
                    disabled={!canContinue}
                    onPress={() => setActive(active + 1)}
                  >
                    Continuer
                  </Button>
                ) : (
                  <View style={tw`flex-row w-full`}>
                    <Button
                      fullWidth
                      className={"flex-1 mr-1"}
                      variant={"outline"}
                      onPress={() => setActive(active - 1)}
                    >
                      Retour
                    </Button>
                    <Button
                      fullWidth
                      className={"flex-1 ml-1"}
                      onPress={() => setActive(active + 1)}
                    >
                      Continuer
                    </Button>
                  </View>
                )}
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
  },
});
