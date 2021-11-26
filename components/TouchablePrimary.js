import React from "react";
import { View, TouchableNativeFeedback, StyleSheet, Text } from "react-native";
import SemiBold from "./SemiBold";

const TouchablePrimary = (props) => {
  return (
    <View style={{ ...styles.btnPrimary, ...props.style }}>
      <TouchableNativeFeedback
        onPress={props.onPress}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SemiBold style={{ color: "white" }}>{props.children}</SemiBold>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  btnPrimary: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 37,
    backgroundColor: "#FF8D44",
    elevation: 5,
    overflow: "hidden",
  },
});
export default TouchablePrimary;
