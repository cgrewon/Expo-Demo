import React from "react";
import { ColorSchemeName, Pressable, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { cleanToken, cleanUser } from "../state/actions";

export default function HeaderRight({ navigation }: { navigation: any }) {

  const dispatch = useDispatch();

  const onSignup = ()=>{
    // reset store

    dispatch(cleanUser());

    dispatch(cleanToken());

    navigation.navigate("SignIn")
  }

  return (
    <Pressable
      onPress={onSignup}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <View style={{ paddingRight: 20 }}>
        <Text>Log out</Text>
      </View>
    </Pressable>
  );
}
