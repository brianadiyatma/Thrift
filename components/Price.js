import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Price = (props) => {
  return (
    <Text style={{ ...styles.Price, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  Price: {
    fontFamily: "LGC-Bold",
  },
});
export default Price;
