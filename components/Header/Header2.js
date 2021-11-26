import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import SemiBold from "../SemiBold";

const Header2 = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={props.onPress}>
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
            source={require("../../assets/img/icon/Arah.png")}
          />
        </TouchableOpacity>
        <SemiBold
          style={{
            fontSize: 20,
            alignSelf: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {props.children}
        </SemiBold>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    marginTop: 60,
    marginLeft: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
export default Header2;
