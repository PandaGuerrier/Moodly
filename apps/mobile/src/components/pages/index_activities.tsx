import Child from "~/models/child";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DefaultActivity } from "~/models/activity";

interface IndexActivitiesProps {
  child: Child;
  defaultActivities: DefaultActivity[];
}

export default function IndexActivities({
  child,
  defaultActivities,
}: IndexActivitiesProps) {
  const router = useRouter();
  return (
    <>
      <StatusBar animated={true} style="dark" />
    </>
  );
}