import { Text, View } from "react-native";
import tw from "twrnc";
import ChildComponent from "~/components/child_component";
import AddChildComponent from "~/components/childs/add/add_child_component";
import User from "~/models/user";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Childs() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    User.getCurrentUser()
      .then((currentUser) => {
        console.log("User data:", currentUser);
        if (!currentUser) {
          console.error("No user found, redirecting to login");
          router.push("/");
          return;
        }
        setUser(currentUser);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <View style={tw`h-full bg-slate-900`}>
      {user ? (
        <AddChildComponent user={user} showAddButton={user.childs.length < 4}>
          <Text style={tw`text-2xl text-blue-400 w-full text-center`}>
            Qui utilise le compte ?
          </Text>
          {user.childs.length > 0 ? (
            <View style={tw`flex-row flex-wrap justify-center w-full`}>
              {user.childs.map((child) => (
                <ChildComponent key={child.id} child={child} />
              ))}
            </View>
          ) : (
            <Text style={tw`text-white text-lg text-center`}>
              Aucun enfant trouvé. Veuillez en ajouter un.
            </Text>
          )}
          {user.childs.length >= 4 && (
            <Text style={tw`text-yellow-400 text-lg text-center mt-4`}>
              Limite de 4 enfants atteinte.
            </Text>
          )}
        </AddChildComponent>
      ) : (
        <Text style={tw`text-white text-lg`}>Chargement...</Text>
      )}
    </View>
  );
}
