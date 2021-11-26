import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SemiBold = (props) => {
  return (
    <Text style={{ ...styles.SemiBold, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  SemiBold: {
    fontFamily: "Montserrat-Semi-Bold",
  },
});
export default SemiBold;
