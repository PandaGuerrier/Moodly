import { View, Text, SafeAreaView, ScrollView } from 'react-native'
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
        <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
          <View style={tw`flex justify-start flex-col px-4 py-8`}>
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

          {
            defaultActivities.length > 0 ? (
                <View style={tw`px-4 pb-20`}>
                  {defaultActivities.map((activity, index) => (
                    <View key={index} style={tw`relative`}>
                      {/* Activity item */}
                      <ActivityShow activity={activity} />

                      {/* Connector line between activities */}
                      {index < defaultActivities.length - 1 && (
                        <View style={tw.style(`absolute left-7 top-[100%] w-0.5 h-4 z-0`,
                          activity.type === 'photo' ? 'bg-blue-500' :
                          activity.type === 'calcul' ? 'bg-green-500' :
                          activity.type === 'dictee' ? 'bg-purple-500' :
                          activity.type === 'audio' ? 'bg-orange-500' : 'bg-gray-500'
                        )} />
                      )}

                      {/* Add spacing between items */}
                      {index < defaultActivities.length - 1 && (
                        <View style={tw`h-4`} />
                      )}
                    </View>
                  ))}
                </View>
            ) : (
                <View style={tw`px-4`}>
                  <Text style={tw`text-gray-500 text-lg font-extralight mt-2`}>
                    Aucune activité disponible pour le moment.
                  </Text>
                </View>
            )
          }
        </ScrollView>
      </SafeAreaView>
  );
}
