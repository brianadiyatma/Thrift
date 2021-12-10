import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import SemiBold from "../SemiBold";

const Header1 = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 45,
      }}
    >
      <SemiBold style={{ fontSize: 17 }}>{props.children}</SemiBold>
      <View
        style={{
          width: 70,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("ListScreen");
          }}
        >
          <Image
            style={{ width: 18, height: 18, resizeMode: "stretch" }}
            source={require("../../assets/img/icon/Vector1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Notifikasi");
          }}
        >
          <Image
            style={{ width: 20, height: 20, resizeMode: "stretch" }}
            source={require("../../assets/img/icon/Vector2.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header1;
