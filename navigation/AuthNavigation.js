import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/AuthScreen/Login";
import Daftar from "../screens/AuthScreen/Daftar";
import Splash from "../screens/Splash";

const AuthStack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Splash" component={Splash} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Daftar" component={Daftar} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
