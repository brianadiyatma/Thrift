import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import SemiBold from "../components/SemiBold";
import Price from "../components/Price";
import COLOR from "../constants/COLOR";

function format(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const Card = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={styles.Card}>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginTop: 5 }}>
            <Image
              source={{
                uri: props.image,
                width: 165,
                height: 170,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10, marginLeft: 10 }}>
          <SemiBold style={{ fontSize: 15, textAlign: "left" }}>
            {props.nama}
          </SemiBold>
        </View>
        <View
          style={{ alignItems: "flex-start", marginLeft: 10, marginTop: 2 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Price>Rp</Price>
            <Price
              style={{
                fontSize: 15,
                textDecorationLine: props.hargaPromo ? "line-through" : "none",
              }}
            >
              {format(props.harga)}
            </Price>
          </View>
          {props.hargaPromo && (
            <Price
              style={{
                fontSize: 15,
                color: COLOR.primary,
              }}
            >
              Rp{format(props.hargaPromo)} (
              {Math.round(
                ((Number(props.harga) - Number(props.hargaPromo)) /
                  Number(props.harga)) *
                  100
              )}
              %)
            </Price>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  Card: {
    marginTop: 20,
    backgroundColor: "#FFF",
    width: 170,
    height: 280,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default Card;
