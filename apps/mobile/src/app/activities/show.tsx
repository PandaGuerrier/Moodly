import { View, Text, SafeAreaView } from 'react-native'
import tw from "twrnc";
import Child from "~/models/child";
import { DefaultActivity } from "~/models/activity";
import ActivityShow from '~/components/activity_show'
import { Button } from '~/components/ui/Button'
import { router } from 'expo-router'

interface Props {
  child: Child;
  defaultActivities: DefaultActivity[];
}

export default function Show({ child, defaultActivities }: Props) {
  return (
      <SafeAreaView style={tw`h-full bg-slate-900`}>
        <View style={tw`flex h-1/3 justify-start flex-col px-4 py-14`}>
          <Text style={tw`text-blue-300 text-3xl font-extrabold `}>Salut {child.nickname} !</Text>
          {
            defaultActivities.length > 0 ? (
                <Text style={tw`text-white text-lg font-extralight mt-2`}>
                  Tu as {defaultActivities.length} activité{defaultActivities.length > 1 ? 's' : ''} disponible{defaultActivities.length > 1 ? 's' : ''}.
                </Text>
            ) : (
                <Text style={tw`text-white text-lg font-extralight mt-2`}>
                  Prêt à découvrir de nouvelles activités ? Tu peux aller voir l'IA pour en trouver.
                </Text>
            )
          }
        </View>
        <View style={tw`flex h-1/3 justify-start flex-col px-4 py-14`}>
          {
            defaultActivities.length > 0 ? (
                <View style={tw`flex flex-col space-y-4`}>
                  {defaultActivities.map((activity, index) => (
                      <ActivityShow activity={activity} key={index} />
                  ))}
                </View>
            ) : (
                <Text style={tw`text-gray-500 text-lg font-extralight mt-2`}>
                  Aucune activité disponible pour le moment.
                </Text>
            )
          }
        </View>
      </SafeAreaView>
  );
}
