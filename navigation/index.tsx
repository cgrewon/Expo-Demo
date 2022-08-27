
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View, Text } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SignInScreen from "../screens/SignIn";
import SignUpScreen from "../screens/SignUp";
import TabHomeScreen from "../screens/TabHomeScreen";
import TabSettingScreen from "../screens/TabSettingScreen";
import TabCalendarScreen from "../screens/TabCalendarScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
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
        headerLeft: () => (
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View style={{ paddingLeft: 20 }}>
              <Text>Hello! username</Text>
            </View>
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate("SignIn")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <View style={{ paddingRight: 20 }}>
              <Text>Log out</Text>
            </View>
          </Pressable>
        ),
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

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
  focused?: boolean;
}) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        width: "100%",
        paddingTop: 10,
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <FontAwesome {...props} size={props.size || 30} />

      <View
        style={{
          backgroundColor: props.focused ? Colors[colorScheme].tabIconSelected : '#fff',
          height: 2,
          width: "80%",
          marginTop: 5
        }}
      />

    </View>
  );
}
