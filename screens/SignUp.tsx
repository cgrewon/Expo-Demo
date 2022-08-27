import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { Input, Button, Switch } from "@rneui/themed";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
const BG1 = require("../assets/images/bg1.png");

export default function SignUpScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  const [checked, setChecked] = useState(false);

  const onSignIn = () => {
    navigation.replace("SignIn");
  };

  const onSignUp = () => {
    navigation.replace("Root");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Image source={BG1} style={styles.imgBack} />
        <View style={styles.mainView}>
          <Text style={styles.title}>Create an account</Text>
          <View style={styles.row}>
            <Input
              placeholder="First Name"
              containerStyle={{ ...styles.inputContainer, width: "50%" }}
              // errorMessage="Invalid password."
            />
            <Input
              placeholder="Last Name"
              containerStyle={{ ...styles.inputContainer, width: "50%" }}
              // errorMessage="Invalid password."
            />
          </View>
          <Input
            placeholder="Unit Number"
            keyboardType="numbers-and-punctuation"
            containerStyle={styles.inputContainer}
            errorStyle={{ color: "red" }}
            // errorMessage="Invalid email."
          />
          <Input
            placeholder="Email"
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
            errorStyle={{ color: "red" }}
            // errorMessage="Invalid email."
          />

          <Input
            placeholder="Password"
            containerStyle={styles.inputContainer}
            secureTextEntry={true}
            // errorMessage="Invalid password."
          />

          <View style={{ ...styles.row, paddingHorizontal: 13 }}>
            <Text style={{ ...styles.grayLabel, width: "75%" }}>
              I agree to the Amenify Terms of Service and Privacy Policy
            </Text>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </View>

          <View style={styles.buttonRowView}>
            <View style={styles.btnSignInWrapper}>
              <Text style={styles.grayLabel}>Already have an account?</Text>
              <Button
                title="Sign In"
                titleStyle={styles.signupBtnTitle}
                buttonStyle={styles.btnSignupContainer}
                type="clear"
                onPress={onSignIn}
              />
            </View>

            <Button
              title="Sign Up"
              buttonStyle={styles.btnSignInContainer}
              onPress={onSignUp}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const BorderRadius = 20;
const AccentColor = "#2e78b7";

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 0,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imgBack: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "70%",
  },
  mainView: {
    borderTopLeftRadius: BorderRadius,
    borderTopRightRadius: BorderRadius,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  inputContainer: {
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 30,
  },
  buttonRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginTop: 20,
  },
  btnSignInWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnSignupContainer: {
    paddingHorizontal: 10,
    borderRadius: 24,
  },
  signupBtnTitle: {
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  btnSignInContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    height: 48,
    borderRadius: 24,
  },
  grayLabel: {
    color: "gray",
    fontSize: 12,
    fontWeight: "400",
  },
});
