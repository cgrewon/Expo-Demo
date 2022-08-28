import React from "react";
import { Text, TextProps } from "./Themed";
import { ButtonProps, Input, Button, InputProps } from "@rneui/themed";
import { TextInput } from "react-native";
export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function AvenirText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "avenir-next" }]} />
  );
}

export const AvenirInput = React.forwardRef((props: InputProps, ref) => {
  return (
    <Input
      {...props}
      inputStyle={[props.inputStyle, { fontFamily: "avenir-next" }]}
      ref={ref as React.Ref<TextInput> | undefined}
    />
  );
});

export function AvenirButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      titleStyle={[props.titleStyle, { fontFamily: "avenir-next" }]}
    />
  );
}
