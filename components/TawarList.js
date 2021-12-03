import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const TawarList = (props) => {
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
      </View>
      <View style={styles.detail}>
        {props.detail ? (
          <TouchableOpacity onPress={props.onPress}>
            <Text
              style={{
                ...styles.productTitle,
                fontSize: 16,
              }}
            >
              Detail
            </Text>
          </TouchableOpacity>
        ) : null}
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
export default TawarList;
