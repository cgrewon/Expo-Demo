import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Input, Button } from "@rneui/themed";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
const BG1 = require("../assets/images/bg1.png");

export default function SignInScreen({
  navigation,
}: RootStackScreenProps<"SignIn">) {

  const onSignUp = ()=>{
    navigation.replace('SignUp')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Image source={BG1} style={styles.imgBack} />
        <View style={styles.mainView}>
          <Text style={styles.title}>Sign In</Text>
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

          <View style={styles.buttonRowView}>
            <Button
              title="Sign Up"
              titleStyle={styles.signupBtnTitle}
              buttonStyle={styles.btnSignupContainer}
              type="clear"
              onPress={onSignUp}
            />
            <Button title="Sign In" buttonStyle={styles.btnSignInContainer} />
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

  btnSignupContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 48,
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
});
