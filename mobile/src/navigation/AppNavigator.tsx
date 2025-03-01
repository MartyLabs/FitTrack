import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignupScreen from "../screens/Auth/SignupScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import LobbyScreen from "../screens/Auth/LobbyScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Lobby"
          component={LobbyScreen}
          options={{ title: "Accueil" }}
        />
        <Stack.Screen
          name="Signin"
          component={SignInScreen}
          options={{ title: "Connexion" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: "Inscription" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
