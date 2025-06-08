import Child from '~/models/child'
import { SafeAreaView, Text, View } from 'react-native'
import tw from 'twrnc'
import { Button } from '~/components/Button'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DefaultActivity } from '~/models/activity'
import ActivityShow from '~/components/activity_show'

interface IndexActivitiesProps {
  child: Child,
  defaultActivities: DefaultActivity[]
}

export default function IndexActivities({ child, defaultActivities }: IndexActivitiesProps) {
  const router = useRouter();
  return (
      <>
        <StatusBar animated={true} style="dark" />

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
          <View style={tw`flex h-1/3 items-center justify-end flex-col`}>
            <View style={tw`w-full flex items-center justify-center px-4`}>
              <Button onPress={() => router.push('/activities/chat')}>Aller voir l'ia</Button>
            </View>
          </View>
        </SafeAreaView>
      </>
  )
}