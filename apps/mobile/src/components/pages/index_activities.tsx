import Child from '~/models/child'
import { SafeAreaView, Text, View } from 'react-native'
import tw from 'twrnc'
import { Button } from '~/components/ui/Button'
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


      </>
  )
}