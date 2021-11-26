import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const ProductList = (props) => {
  return (
    <View style={styles.screen}>
      <Image
        source={{
          uri: props.imgurl,
          width: 90,
          height: 90,
        }}
      />
      <View style={styles.title}>
        <Text style={styles.productTitle}>{props.children}</Text>
        <Text
          style={{
            ...styles.productTitle,
            fontSize: 14,
            color: props.statusColor,
          }}
        >
          {props.status}
        </Text>
      </View>
      <View style={styles.detail}>
        <TouchableOpacity>
          <Text
            style={{
              ...styles.productTitle,
              fontSize: 16,
            }}
          >
            Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  productTitle: {
    fontFamily: "LGC-Bold",
    fontSize: 17,
  },
  title: {
    marginLeft: 30,
  },
  detail: {
    marginLeft: 50,
  },
});
export default ProductList;
