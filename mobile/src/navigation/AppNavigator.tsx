import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignupScreen from "../screens/Auth/SignupScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import LobbyScreen from "../screens/Auth/LobbyScreen";
import ScanScreen from "../screens/Food/Scan/ScanScreen";
import ScanDetailsScreen from "../screens/Food/Scan/ScanDetailsScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{ title: "Scan" }}
        />
        <Stack.Screen
          name="ScanDetails"
          component={ScanDetailsScreen}
          options={{ title: "ScanDetails" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
