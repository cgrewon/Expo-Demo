import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect } from "react";
import SignInScreen from "../../screens/SignIn";
import SignUpScreen from "../../screens/SignUp";
import { RootStackParamList } from "../../types";

import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { IMyUserResult, IToken } from "../../graphql/interfaces";
import { MyUserGql } from "../../graphql/gql_tags";
import { updateFetchingUser, updateUser } from "../../state/actions";
import BottomTabNavigator from "../../components/navigation/BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [getUser, userQueryState] = useLazyQuery<IMyUserResult>(MyUserGql);

  const token: IToken = useSelector((state: { token: IToken }) => state.token);

  useEffect(() => {
    if (token && token.accessToken) {
      dispatch(updateFetchingUser(true));
      getUser();
    }
  }, [token]);

  useEffect(() => {
    dispatch(updateFetchingUser(userQueryState?.loading));
    if (userQueryState?.data) {
      dispatch(updateUser(userQueryState.data.myUser));
      navigation.navigate("Root");      
    } else {
      navigation.navigate("SignIn");      
    }
  }, [userQueryState]);

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  );
}
