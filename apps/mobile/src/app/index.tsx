import { Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Connexion from "~/components/pages/connexion";
import Childs from '~/app/childs'
import User from '~/models/user'
import { useRouter } from 'expo-router'

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null as User | null);
  const router = useRouter();

  useEffect(() => {
    User.getCurrentUser()
      .then((user) => {
        console.log("User data:", user);
        setUser(user);
        if (user) {
          console.log("User found, redirecting to /childs");
          router.push("/childs");
          return;
        } else {
          console.log("No user found, staying on login page");
        }
      })
      .finally(async () => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      ) : user ? (
        <Childs />
      ) : (
          <Connexion />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "space-between",
  },
});
