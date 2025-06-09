import { JSX, useEffect, useState } from "react";
import Child from "~/models/child";
import { DefaultActivity } from "~/models/activity";
import User from "~/models/user";
import DefaultActivitiesManager from "~/managers/default_activities_manager";
import Show from "~/app/activities/show";
import Chat from "~/app/activities/chat";
import Dictee from "~/app/activities/mode/dictee";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [child, setChild] = useState(null as Child | null);
  const [activities, setActivities] = useState([] as DefaultActivity[]);
  const [actualPage, setActualPage] = useState("Accueil");

  useEffect(() => {
    User.getCurrentUser()
      .then((user) => {
        if (user && user.selectedChild) {
          console.log(user.selectedChild);
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

  const pages: {
    name: string;
    icon: string;
    content: JSX.Element;
  }[] = [
    {
      name: "Accueil",
      icon: "home",
      content: <Show child={child!} defaultActivities={activities} />
    },
    {
      name: "Chat",
      icon: "comment",
      content: <Chat />
    },
    {
      name: "Paramètres",
      icon: "user",
      content: <Dictee />
    }
  ];

  // Find the current page content based on actualPage state
  const currentPageContent = pages.find(page => page.name === actualPage)?.content;

  return (
    <View style={tw`flex-1`}>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text>Chargement...</Text>
        </View>
      ) : (
        <View style={tw`flex-1`}>
          {/* Page Content */}
          <View style={tw`flex-1`}>
            {currentPageContent}
          </View>

          {/* Tab Bar */}
          <View style={tw`flex-row justify-around items-center bg-slate-900 py-2.5 border-t border-slate-700`}>
            {pages.map((page, index) => (
              <TouchableOpacity 
                key={index}
                style={tw`items-center p-2.5 ${actualPage === page.name ? 'opacity-100' : 'opacity-50'}`}
                onPress={() => setActualPage(page.name)}
              >
                <FontAwesome
                  // @ts-ignore
                  name={page.icon}
                  size={24} 
                  color={actualPage === page.name ? "#60A5FA" : "#94A3B8"} 
                />
                <Text style={tw`${actualPage === page.name ? 'text-blue-400' : 'text-slate-400'} mt-1 text-xs`}>
                  {page.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
