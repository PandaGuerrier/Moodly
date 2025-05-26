import { View } from "react-native";
import tw from "twrnc";
import { storeData } from "~/utils/store/storage";
import { useRouter } from "expo-router";
import Child from '~/models/child'
import { Avatar } from '~/components/Avatar'

export default function ChildComponent({ child }: { child: Child }) {
  const router = useRouter();

  const handlePress = async () => {
    console.log("Child pressed:", child.firstName, child.lastName);
    // Here you can navigate to a child detail screen or perform another action
    await storeData("selectedChild", child);
    router.push(`/activity`);
  };

  const name =  `${child.nickname}` || `${child.firstName} ${child.lastName}`.trim();

  return (
    <View style={tw`mx-4 w-24`}>
      <Avatar onPress={handlePress} title={name} imageUrl={child.avatarUrl || "https://previews.123rf.com/images/djvstock/djvstock1703/djvstock170311221/74947167-enfant-enfant-avatar-illustration-vectorielle-ic%C3%B4ne.jpg"} />
    </View>
  );
}
