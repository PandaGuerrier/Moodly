import { Text, View, SafeAreaView } from 'react-native'
import tw from 'twrnc'
import { Input } from '~/components/ui/Input'
import { useState } from 'react'

export default function HomePage() {
  const [errors, setErrors] = useState<any>({});
  const setData = (data: any) => {
    console.log('Data set:', data);
  }
  return (
        <SafeAreaView style={tw`h-full bg-slate-900`}>
          <View style={tw`flex-1 items-center justify-center`}>
            <Text style={tw`text-white text-xl`}>Dites en nous plus sur vous !</Text>
            <Input name={"email"} displayName={"Adresse email"} setData={setData} errors={errors} />
          </View>
        </SafeAreaView>
  );
}
