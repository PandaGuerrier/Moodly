import { Stack } from "expo-router";
import "../css/global.css";

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerShown: false,
        }} />
    </Stack>
  )
}