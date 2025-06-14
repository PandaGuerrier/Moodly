import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";
import Child from "~/models/child";
import { DefaultActivity } from "~/models/activity";
import ActivityShow from "~/components/activity_show";
import Category from "~/models/category";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  child: Child;
  categories: Category[];
}

export default function Show({ child, categories }: Props) {
  const [defaultActivities, setDefaultActivities] = useState<DefaultActivity[]>(
    [],
  );

  useEffect(() => {
    for (const category of categories) {
      if (category.activities && category.activities.length > 0) {
        setDefaultActivities((prev) => [...prev, ...category.activities]);
      }
    }
  }, []);

  // Build the list of elements and sticky header indices
  const elements: React.ReactNode[] = [
    <View key="greeting" style={tw`flex justify-start flex-col px-4 py-8`}>
      <Text style={tw`text-blue-300 text-3xl font-extrabold `}>
        Salut {child.nickname} !
      </Text>
      {categories.length > 0 ? (
        <Text style={tw`text-white text-lg font-extralight mt-2`}>
          Tu as {defaultActivities.length} activité
          {defaultActivities.length > 1 ? "s" : ""} disponible
          {defaultActivities.length > 1 ? "s" : ""}.
        </Text>
      ) : (
        <Text style={tw`text-white text-lg font-extralight mt-2`}>
          Prêt à découvrir de nouvelles activités ? Tu peux aller voir l'IA pour
          en trouver.
        </Text>
      )}
    </View>,
  ];
  const stickyHeaderIndices: number[] = [];

  categories.forEach((category, idx) => {
    // The header index is elements.length before pushing
    stickyHeaderIndices.push(elements.length);

    elements.push(
      <SafeAreaView
        key={`header-${category.id}`}
        style={[
          tw`py-2 rounded-lg bg-${category.color}-500 flex justify-center items-center m-2 shadow-lg`,
        ]}
      >
        <View style={tw`flex flex-row items-center justify-center w-full`}>
          <FontAwesome
            /*@ts-ignore*/
            name={category.icon}
            size={54}
            style={tw`text-${category.color}-300 w-1/3 text-center`}
          />
          <View
            style={tw`h-12 w-px bg-${category.color}-300 flex justify-end`}
          />
          <Text style={tw`text-white text-lg font-bold w-2/3 text-center`}>
            {category.name}
          </Text>
        </View>
      </SafeAreaView>,
    );

    elements.push(
      <View key={`activities-${category.id}`} style={tw`px-4 py-2`}>
        <View style={tw`flex flex-row flex-wrap justify-between`}>
          {category.activities.map((activity: DefaultActivity, i) => (
            <ActivityShow
              key={activity.id}
              activity={activity}
              right={i % 2 === 0}
            />
          ))}
        </View>
      </View>,
    );
  });

  return (
    <SafeAreaView style={tw`h-full bg-slate-900`}>
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyHeaderIndices}
      >
        {elements}
      </ScrollView>
    </SafeAreaView>
  );
}
