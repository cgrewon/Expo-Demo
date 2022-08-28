import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Switch } from "@rneui/themed";

import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { ICreateUserResult, IError, IToken } from "../graphql/interfaces";
import { useMutation } from "@apollo/client";
import { CreateUserGql } from "../graphql/gql_tags";
import { BorderRadius } from "../constants/Layout";
import { useDispatch } from "react-redux";
import { updateToken } from "../state/actions";
import { AvenirText, AvenirInput, AvenirButton } from "../components/StyledComponents";


const BG1 = require("../assets/images/bg1.png");

export default function SignUpScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {

  const dispatch = useDispatch();
  
  const [checked, setChecked] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [unitNumber, setUnitNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  

  const [errValidation, setErrValidation] = useState<IError>();
  const [createUser, { data, loading, error, reset }] =
    useMutation(CreateUserGql);

  let firstNameRef = React.createRef<TextInput>();
  let lastNameRef = React.createRef<TextInput>();
  let unitRef = React.createRef<TextInput>();
  let emailRef = React.createRef<TextInput>();
  let pwdRef = React.createRef<TextInput>();

  useEffect(() => {
    if (data) {
      const token: IToken = (data as ICreateUserResult)
        .createUser.token as IToken;
      dispatch(updateToken(token));
      navigation.replace("Root");
    }
  }, [data]);

  const onSignIn = () => {
    navigation.replace("SignIn");
  };

  const onSignUp = () => {
    reset();
    if (!validate()) {
      return;
    }

    createUser({
      variables: {
        email: email,
        password: pwd,
        firstName,
        lastName
      },
    });


  };

  const validate = (): boolean => {
    let err: IError|undefined;

    if (!checked) {
      err = { message: "Please agree Terms of Service and Privacy Policy" };
    }

    if (!email) {
      err = { message: "Please agree Terms of Service and Privacy Policy" };
    }

    if (!firstName) {
      err = {message: 'First Name required'};
    }
    if (!lastName) {
      err = {message: 'Last Name required'};
    }
    if (!pwd) {
      err = {message: 'Password required'};
    }

    
    if (err) {
      setErrValidation(err);
      return false
    };
    return true;
  };

  const onChangeText = (
    value: string,
    setCallback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setErrValidation(undefined);
    setCallback(value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Image source={BG1} style={styles.imgBack} />
        <View style={styles.mainView}>
          <AvenirText style={styles.title}>Create an account</AvenirText>
          <View style={styles.row}>
            <AvenirInput
              ref={firstNameRef}
              placeholder="First Name"
              containerStyle={{ ...styles.inputContainer, width: "50%" }}
              onChangeText={(value) => {
                onChangeText(value, setFirstName);
              }}
              value={firstName}
              onSubmitEditing={() => {
                lastNameRef.current?.focus();
              }}
            />
            <AvenirInput
              ref={lastNameRef}
              placeholder="Last Name"
              containerStyle={{ ...styles.inputContainer, width: "50%" }}
              onChangeText={(value) => {
                onChangeText(value, setLastName);
              }}
              value={lastName}
              onSubmitEditing={() => {
                unitRef.current?.focus();
              }}
            />
          </View>
          <AvenirInput
            ref={unitRef}
            placeholder="Unit Number"
            keyboardType="numbers-and-punctuation"
            containerStyle={styles.inputContainer}
            errorStyle={{ color: "red" }}
            onChangeText={(value) => {
              onChangeText(value, setUnitNumber);
            }}
            value={unitNumber}
            onSubmitEditing={() => {
              emailRef.current?.focus();
            }}
          />
          <AvenirInput
            ref={emailRef}
            placeholder="Email"
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
            errorStyle={{ color: "red" }}
            onChangeText={(value) => {
              onChangeText(value, setEmail);
            }}
            value={email}
            onSubmitEditing={() => {
              pwdRef.current?.focus();
            }}
          />

          <AvenirInput
            ref={pwdRef}
            placeholder="Password"
            containerStyle={styles.inputContainer}
            secureTextEntry={true}
            onChangeText={(value) => {
              onChangeText(value, setPwd);
            }}
            value={pwd}
          />

          <View style={{ ...styles.row, paddingHorizontal: 13, marginBottom: 10 }}>
            <AvenirText style={{ ...styles.grayLabel, width: "75%" }}>
              I agree to the Amenify Terms of Service and Privacy Policy
            </AvenirText>
            <Switch
              value={checked}
              onValueChange={(value) => setChecked(value)}
            />
          </View>
          {errValidation && (
            <AvenirText style={styles.errTitle}>{errValidation.message}</AvenirText>
          )}
          {error && <AvenirText style={styles.errTitle}>{error.message}</AvenirText>}
          <View style={styles.buttonRowView}>
            <View style={styles.btnSignInWrapper}>
              <AvenirText style={styles.grayLabel}>Already have an account?</AvenirText>
              <AvenirButton
                title="Sign In"
                titleStyle={styles.signupBtnTitle}
                buttonStyle={styles.btnSignupContainer}
                type="clear"
                onPress={onSignIn}
              />
            </View>

            <AvenirButton
              title="Sign Up"
              buttonStyle={styles.btnSignInContainer}
              onPress={onSignUp}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


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
  errTitle: {
    color: "red",
    fontSize: 12,
    paddingHorizontal: 10,
  },
});
