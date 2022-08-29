import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useSelector } from "react-redux";
import { IToken } from "../graphql/interfaces";
import RootNavigator from "../components/navigation/RootNavigator";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const token: IToken = useSelector((state: { token: IToken }) => state.token);

  const httpLink = createHttpLink({
    uri: "https://api.amenify.com/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: 'Bearer ' + token?.accessToken,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
