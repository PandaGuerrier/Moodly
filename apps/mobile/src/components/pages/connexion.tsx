import { SafeAreaView, Text, View } from 'react-native'
import tw from 'twrnc'
import { AppleAuthButton } from '~/components/apple_auth'
import { EmailAuthButton } from '~/components/email_auth'

export default function Connexion() {
  return (
      <>
        <SafeAreaView style={tw`h-full bg-slate-900`}>
          <View style={tw`flex h-1/2 justify-end flex-col px-4`}>
            <Text style={tw`text-blue-300 text-3xl font-extrabold `}>🎓 Moodly</Text>
            <Text style={tw`text-white text-lg font-extralight mt-2`}>l'appli qui fait grandir les enfants dans le monde numérique… un pas à la fois, en s'amusant !</Text>
          </View>
          <View style={tw`flex h-1/2 items-center justify-end flex-col`}>
            <View style={tw`w-full flex items-center justify-center px-4`}>
              <AppleAuthButton />
              <EmailAuthButton />
            </View>
          </View>
        </SafeAreaView>
      </>
  );
}