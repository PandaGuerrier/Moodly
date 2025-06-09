import * as AppleAuthentication from 'expo-apple-authentication'
import tw from 'twrnc'
import { storeData } from '~/utils/store/storage'
import { ApiManager } from '~/utils/api/api_manager'
import { useRouter } from 'expo-router'

export function AppleAuthButton(){
  const router = useRouter();

  return (
      <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={
            AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
          }
          cornerRadius={500}
          style={tw`w-84 h-14 mb-4 mt-5`}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
                nonce: "nonce",
                state: "state",
              });
              // signed in

              console.log(credential);
              await storeData("apple-id", credential);
              const response = await ApiManager.getInstance().post("/auth/apple", {
                apple: credential,
              }, {}, true);

              console.log("get response from auth:");
              console.log(response.data);
              if (response.data) {
                console.log("User signed in successfully");
                const payload = response.data;
                await storeData("user", payload.user);
                await storeData("token", payload.token);
                console.log("Token from apple_auth.tsx:", payload.token);

                ApiManager.getInstance().setAuthorization(`${payload.token.token}`);

                router.push("/childs");
              } else {
                console.log("Error signing in");
              }
            } catch (e: any) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
      />
  )
}