import { Stack } from "expo-router";
import "../css/global.css";

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{
            headerShown: false,
        }} />
      <Stack.Screen name="childs" options={{
        headerShown: false,
      }} />
      <Stack.Screen name="activities" options={{
        headerShown: false,
      }} />
    </Stack>
  )
}