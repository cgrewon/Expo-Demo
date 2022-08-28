import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import TabHomeScreen from "../../screens/TabHomeScreen";
import TabSettingScreen from "../../screens/TabSettingScreen";
import TabCalendarScreen from "../../screens/TabCalendarScreen";
import { RootTabParamList, RootTabScreenProps } from "../../types";
import HeaderLeft from "../../components/HeaderLeft";
import HeaderRight from "../../components/HeaderRight";
import TabBarIcon from "./TabBarIcon";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarBadgeStyle: {
          backgroundColor: Colors[colorScheme].badgeBG,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme].headerBG,
        },
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      })}
    >
      <BottomTab.Screen
        name="TabHome"
        component={TabHomeScreen}
        options={({ navigation }: RootTabScreenProps<"TabHome">) => ({
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        })}
      />
      <BottomTab.Screen
        name="TabCalendar"
        component={TabCalendarScreen}
        options={({ navigation }: RootTabScreenProps<"TabCalendar">) => ({
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="calendar"
              color={color}
              size={24}
              focused={focused}
            />
          ),

          tabBarBadge: 3,
        })}
      />
      <BottomTab.Screen
        name="TabSetting"
        component={TabSettingScreen}
        options={({ navigation }: RootTabScreenProps<"TabSetting">) => ({
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="cog" color={color} focused={focused} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
