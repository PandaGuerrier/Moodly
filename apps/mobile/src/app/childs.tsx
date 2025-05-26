import { Text, View } from "react-native";
import tw from "twrnc";
import ChildComponent from "~/components/child_component";
import AddChildComponent from "~/components/add_child_component";
import User from "~/models/user";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

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
        <AddChildComponent user={user}>
          <View style={tw`my-5 grid grid-cols-2 grid-rows-3 gap-4`}>
            {user!.childs.map((child, index) => (
                <ChildComponent key={index} child={child} />
            ))}
          </View>
        </AddChildComponent>
      ) : (
        <Text style={tw`text-white text-lg`}>Chargement...</Text>
      )}
    </View>
  );
}
