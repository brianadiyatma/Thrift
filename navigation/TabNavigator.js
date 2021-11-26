import React from "react";
import { View, Text, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Beranda from "../screens/Beranda";
import Promo from "../screens/Promo";
import Akun from "../screens/Akun";
import Disukai from "../screens/Disukai";
import COLOR from "../constants/COLOR";
import SemiBold from "../components/SemiBold";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 2,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/img/icon/SVG/Home.png")}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLOR.primary : COLOR.black,
                }}
              />
              <SemiBold
                style={{
                  fontSize: 10,
                  color: focused ? COLOR.primary : COLOR.black,
                }}
              >
                Beranda
              </SemiBold>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Promo"
        component={Promo}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/img/icon/SVG/Promo.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLOR.primary : COLOR.black,
                  marginBottom: 5,
                }}
              />
              <SemiBold
                style={{
                  fontSize: 10,
                  color: focused ? COLOR.primary : COLOR.black,
                }}
              >
                Promo
              </SemiBold>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Disukai"
        component={Disukai}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/img/icon/SVG/Disukai.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLOR.primary : COLOR.black,
                  marginBottom: 5,
                }}
              />
              <SemiBold
                style={{
                  fontSize: 10,
                  color: focused ? COLOR.primary : COLOR.black,
                }}
              >
                Disukai
              </SemiBold>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Akun"
        component={Akun}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/img/icon/SVG/Akun.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLOR.primary : COLOR.black,
                  marginBottom: 5,
                }}
              />
              <SemiBold
                style={{
                  fontSize: 10,
                  color: focused ? COLOR.primary : COLOR.black,
                }}
              >
                Akun
              </SemiBold>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
