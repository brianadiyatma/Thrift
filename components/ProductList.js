import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import TouchablePrimary from "./TouchablePrimary";
import SemiBold from "./SemiBold";
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
            width: 200,
          }}
        >
          {props.status}
        </Text>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            props.navigation.navigate("ProfilePenjual", {
              penjualId: props.penjual.id,
            })
          }
        >
          <Image
            style={{
              width: 18,
              height: 18,
              resizeMode: "stretch",
              marginRight: 10,
            }}
            source={require("../assets/img/icon/shop.png")}
          />
          <SemiBold>{props.penjual.username}</SemiBold>
        </TouchableOpacity>
      </View>
      <View style={styles.detail}>
        <TouchablePrimary
          style={{ width: 80, height: 25 }}
          onPress={props.onPress}
        >
          <Text
            style={{
              ...styles.productTitle,
              fontSize: 16,
            }}
          >
            Detail
          </Text>
        </TouchablePrimary>
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
    maxWidth: 150,
  },
  detail: {
    marginLeft: 20,
  },
});
export default ProductList;
