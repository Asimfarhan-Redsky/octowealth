import React, { useState, useEffect,  } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignUpScreen";
import ExpenceFlowIntroScreen from "../screens/ExpenceFlowIntroScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import {
  CALCULATOR_SCREEN,
  EXPENCE_INTRO_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  HOME_SCREEN,
  LOGIN_SCREEN,
  SIGNUP_SCREEN,
  WELCOME_SCREEN,
} from "../constants/constants";
import CalculatorScreen from "../components/Calculator";
import DrawerNavigation from "./DrawerNavigation";
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();


const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={WELCOME_SCREEN}>
      <Stack.Screen
        name={WELCOME_SCREEN}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SIGNUP_SCREEN}
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={EXPENCE_INTRO_SCREEN}
        component={ExpenceFlowIntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={CALCULATOR_SCREEN}
        component={CalculatorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const userLoginState = useSelector((state) => state?.userLogedin)
  const checkLoggedIn = async () => {
    try {
      const storedIsLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (storedIsLoggedIn) {
        setIsLoggedIn(storedIsLoggedIn);
      }
      else {
        setIsLoggedIn(null);
      }
    } catch (error) {
      console.log("Error retrrieving authentication state:", error);
    }
  }
  useEffect(() => {
    checkLoggedIn();
  }, [userLoginState.isUser]);
  return (
    <NavigationContainer>    
      {(userLoginState.isUser !== undefined || null || "") ||
        (isLoggedIn !== null || undefined || "") ? <DrawerNavigation /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
