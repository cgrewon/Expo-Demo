import React from "react";
import { ColorSchemeName, Pressable, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { IMyUser, IToken } from "../../graphql/interfaces";

export default function HeaderLeft() {

  const user = useSelector((state: {user: IMyUser}) => state.user);

  return (
    <Pressable
      onPress={() => {}}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <View style={{ paddingLeft: 20 }}>
        <Text>Hello! {user?.firstName} {user?.lastName}</Text>
      </View>
    </Pressable>
  );
}
