import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import { ApiManager } from '~/utils/api/api_manager'
import { AxiosError } from 'axios'
import User from '~/models/user'

export default function Chat() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef(null as CameraView | null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [child, setChild] = useState(-1); // Replace with actual child ID or state management

  useEffect(() => {
    User.getCurrentUser().then((user) => {
      if (user?.selectedChild) {
        setChild(user.selectedChild.id);
      }
    });
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Nous avons besoin d'autorisations pour accéder a la caméra
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function getPhoto() {
    ref.current
      ?.takePictureAsync({
        quality: 0.5,
        skipProcessing: true,
        base64: true,
      })
      .then(async (photo) => {
        setLoading(true);
        console.log("Photo taken:", photo);

        const data = {
          photo: {
            base64: photo.base64,
            type: "jpg",
            name: "photo.jpg",
          },
          childId: child,
        };

        ApiManager.getInstance()
          .post("/activities/chat", data)
          .then((response) => {
            console.log("Photo uploaded successfully:", response.data);
            setMessage("");
            console.log("Response data:", response.data.message);
            setMessage(response.data.message);
            setLoading(false);
          })
          .catch((error: AxiosError) => {
            console.log(error.response?.status);
          });
      })
      .catch((error) => {
        console.error("Error taking photo:", error);
      });
  }

  return (
    <View style={styles.container}>
      <CameraView style={tw`flex-1`} facing={facing} ref={ref}>
        <View style={tw`h-[100%] flex items-center justify-end py-8`}>
          {loading ? (
            <View style={[
              tw`p-5 bg-gray-400/40 backdrop-blur-xl rounded-2xl mb-4 shadow-xl`,
              { borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.4)', shadowColor: '#fff', shadowOpacity: 0.1, shadowRadius: 15 }
            ]}>
              <ActivityIndicator size="large" color="white" />
            </View>
          ) : message ? (
            <Text
              style={[
                tw`text-white text-md p-4 bg-gray-400/40 backdrop-blur-xl rounded-2xl mb-4 shadow-xl`,
                { borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.4)', shadowColor: '#fff', shadowOpacity: 0.1, shadowRadius: 15 }
              ]}
            >
              {message}
            </Text>
          ) : (
            <Text
              style={[
                tw`text-white text-md p-4 bg-gray-400/40 backdrop-blur-xl rounded-2xl mb-4 shadow-xl`,
                { borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.4)', shadowColor: '#fff', shadowOpacity: 0.1, shadowRadius: 15 }
              ]}
            >
              Prenez une photo pour commencer
            </Text>
          )}
          <TouchableOpacity
            style={tw`w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center`}
            onPress={getPhoto}
          >
            <View style={tw`w-20 h-20 rounded-full bg-gray-200`} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
