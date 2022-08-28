import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
const BG1 = require("../assets/images/bg1.png");

import { useMutation } from "@apollo/client";
import { CreateTokenGql } from "../graphql/gql_tags";
import {
  ICreateTokenByPasswordResult,
  IError,
  IToken,
} from "../graphql/interfaces";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../state/actions";
import { AvenirButton, AvenirInput, AvenirText } from "../components/StyledComponents";

export default function SignInScreen({
  navigation,
}: RootStackScreenProps<"SignIn">) {
  const dispatch = useDispatch();
  const fetchingUser = useSelector((state: {fetchingUser: boolean}) => state.fetchingUser);

  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const pwdRef = React.createRef<TextInput>();
  const [errValidation, setErrValidation] = useState<IError>();
  const [createToken, { data, loading, error, reset }] =
    useMutation<ICreateTokenByPasswordResult>(CreateTokenGql);

  useEffect(() => {
    if (data) {
      const token: IToken = (data as ICreateTokenByPasswordResult)
        .createTokenByPassword.token as IToken;
      dispatch(updateToken(token));
    }
  }, [data]);

  const onSignUp = () => {
    navigation.replace("SignUp");
  };

  const validate = (): boolean => {
    let err: IError | undefined;

    if (!email) {
      err = {
        message: "Required email.",
      };
    }

    if (!pwd) {
      err = {
        message: "Required password.",
      };
    }
    setErrValidation(err);
    return !err;
  };

  const onSignIn = () => {
    reset();
    if (validate() == false) {
      return;
    }

    createToken({
      variables: {
        email: email,
        password: pwd,
      },
    });
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
          <AvenirText style={styles.title}>Sign In</AvenirText>
          <AvenirInput
            placeholder="Email"
            keyboardType="email-address"
            containerStyle={styles.inputContainer}
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
            onSubmitEditing={() => {
              onSignIn();
            }}
          />
          {errValidation && (
            <AvenirText style={styles.errTitle}>{errValidation.message}</AvenirText>
          )}
          {error && <Text style={styles.errTitle}>{error.message}</Text>}
          <View style={styles.buttonRowView}>
            <AvenirButton
              title="Sign Up"
              titleStyle={styles.signupBtnTitle}
              buttonStyle={styles.btnSignupContainer}
              type="clear"
              onPress={onSignUp}
            />
            <AvenirButton
              title="Sign In"
              buttonStyle={styles.btnSignInContainer}
              onPress={onSignIn}
              loading={loading || fetchingUser}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const BorderRadius = 20;

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
  errTitle: {
    color: "red",
    fontSize: 12,
    paddingHorizontal: 10,
  },
});
