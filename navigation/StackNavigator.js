import * as React from "react";
import LoginScreen from "../screens/Auth/Login";
import SignupScreen from "../screens/Auth/Signup";
import ForgotPasswordScreen from "../screens/Auth/ForgotPassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const INITIAL_ROUTE_NAME = "Login";

export default function StackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        stackAnimation={"fade"}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        stackAnimation={"fade"}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        stackAnimation={"fade"}
      />
    </Stack.Navigator>
  );
}
