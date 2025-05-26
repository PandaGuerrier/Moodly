import { Text, View } from 'react-native'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import { AppleAuthButton } from '~/components/apple_auth'

export default function Connexion() {
  return (
      <>
        <View style={tw`h-full items-center justify-center bg-slate-900`}>
          <View style={tw`flex w-full flex-col`}>
            <View style={tw`flex items-center`}>
              <Text style={tw`font-bold text-blue-500 text-5xl text-center`}>Moodly</Text>
            </View>
            <View style={tw`flex-1 items-center`}>
              <AppleAuthButton />
            </View>
          </View>
        </View>
        <StatusBar style="auto" />
      </>
  );
}