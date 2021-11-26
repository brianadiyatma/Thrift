import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Medium = (props) => {
  return (
    <Text style={{ ...styles.SemiBold, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  SemiBold: {
    fontFamily: "Montserrat-Medium",
  },
});
export default Medium;
