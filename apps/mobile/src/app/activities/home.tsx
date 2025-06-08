import { View, Text } from "react-native";
import tw from "twrnc";
import { useEffect, useState } from "react";
import Child from "~/models/child";
import User from "~/models/user";
import IndexActivities from "~/components/pages/index_activities";
import { DefaultActivity } from "~/models/activity";
import DefaultActivitiesManager from "~/managers/default_activities_manager";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [child, setChild] = useState(null as Child | null);
  const [activities, setActivities] = useState([] as DefaultActivity[]);

  useEffect(() => {
    User.getCurrentUser()
      .then((user) => {
        if (user && user.selectedChild) {
          setChild(user.selectedChild);
        } else {
          console.warn("No child found for the current user");
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });

    DefaultActivitiesManager.fetch()
      .then((fetchedActivities) => {
        setActivities(fetchedActivities);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Text style={tw`text-gray-500`}>Chargement...</Text>
      ) : child ? (
        <IndexActivities child={child} defaultActivities={activities} />
      ) : (
        <Text style={tw`text-red-500 text-lg`}>No child selected.</Text>
      )}
    </>
  );
}
