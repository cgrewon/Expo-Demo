import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { View } from "react-native";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export default function TabBarIcon(props: {
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
          backgroundColor: props.focused
            ? Colors[colorScheme].tabIconSelected
            : "#fff",
          height: 2,
          width: "80%",
          marginTop: 5,
        }}
      />
    </View>
  );
}
