import { View, Alert } from "react-native";
import tw from "twrnc";
import { storeData } from "~/utils/store/storage";
import { useRouter } from "expo-router";
import Child from '~/models/child'
import { Avatar } from '~/components/Avatar'
import User from '~/models/user'
import { ApiManager } from '~/utils/api/api_manager'

export default function ChildComponent({ child }: { child: Child }) {
  const router = useRouter();

  const handlePress = async () => {
    console.log("Child pressed:", child.nickname);
    // Here you can navigate to a child detail screen or perform another action
    await storeData("selectedChild", child);
    const user = await User.getCurrentUser();
    if (!user) {
      console.error("No user found, redirecting to login");
      router.push("/");
      return;
    }

    user.selectedChild = child; // Set the selected child in the user model
    router.push(`/activities/home`);
  };

  const deleteChild = async () => {
    try {
      console.log("Deleting child:", child.id);
      const response = await ApiManager.getInstance().delete(`/child/${child.id}`);

      if (response.status !== 200) {
        console.error("Failed to delete child:", response.status, response.data);
        Alert.alert("Erreur", "Impossible de supprimer cet enfant.");
        return;
      }

      console.log("Child deleted successfully");
      // Refresh the user data to update the children list
      await User.getCurrentUser(true);
      // Refresh the current page
      router.replace("/childs");
    } catch (error) {
      console.error("Error deleting child:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la suppression de l'enfant.");
    }
  };

  const handleLongPress = () => {
    Alert.alert(
      "Supprimer l'enfant",
      `Êtes-vous sûr de vouloir supprimer ${child.nickname} ?`,
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Supprimer", 
          onPress: deleteChild,
          style: "destructive"
        }
      ]
    );
  };

  const name =  `${child.nickname}`;
  const avatar = child.avatar || "sanglier"; // Default to "sanglier" if no avatar is set

  return (
    <View style={tw`mx-4 w-24`}>
      <Avatar 
        onPress={handlePress} 
        onLongPress={handleLongPress}
        title={name} 
        imageUrl={`${process.env.EXPO_PUBLIC_API_URL}/uploads/avatars/${avatar}.png`} 
      />
    </View>
  );
}
