import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import Price from "../../components/Price";
import { RadioButton } from "react-native-paper";
import TouchablePrimary from "../../components/TouchablePrimary";

const format = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const BayarPesanan = ({ navigation }) => {
  const [metode, setMetode] = useState("Transfer");
  const handleKonfirmasi = () => {
    if (metode === "Transfer") {
      navigation.navigate("Transfer");
    } else if (metode === "QRIS") {
      navigation.navigate("QRIS");
    } else {
      navigation.navigate("Transfer");
    }
  };
  return (
    <View>
      <Header2 onPress={() => navigation.goBack()}>Pembayaran</Header2>
      <View style={styles.section1}>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <View style={styles.labelContainer}>
            <View style={styles.produkContainer}>
              <SemiBold style={styles.Label}>Produk</SemiBold>
            </View>
            <View style={{ width: 190 }}></View>
            <SemiBold style={styles.Label}>SubTotal</SemiBold>
          </View>
          <View style={styles.produkContent}>
            <View style={{ width: 120, flexDirection: "row" }}>
              <Image
                style={styles.img}
                source={require("../../assets/img/Product/Sepatu.png")}
              />
              <View style={{ width: 190, paddingLeft: 20 }}>
                <SemiBold>Sepatu Nike Kondisi 90%</SemiBold>
              </View>
              <Price>Rp. {format(200000)}</Price>
            </View>
          </View>
          <View style={{ marginTop: 22 }}>
            <SemiBold style={styles.Label}>Metode Pengiriman</SemiBold>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <RadioButton
                value="Standard"
                disabled={true}
                status={"checked"}
              />
              <Price style={{ color: "#746F6C" }}>Standard</Price>
            </View>
          </View>
          <View>
            <SemiBold style={styles.Label}>Metode Pembayaran</SemiBold>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="first"
                  status={metode === "Transfer" ? "checked" : "unchecked"}
                  onPress={() => setMetode("Transfer")}
                  color="black"
                />
                <Price>Transfer</Price>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="second"
                  status={metode === "QRIS" ? "checked" : "unchecked"}
                  onPress={() => setMetode("QRIS")}
                  color="black"
                />
                <Price>QRIS</Price>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="second"
                  status={metode === "COD" ? "checked" : "unchecked"}
                  onPress={() => setMetode("COD")}
                  color="black"
                />
                <Price>Cash On Delivery (COD)</Price>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#E1E1E1",
          borderBottomWidth: 1,
          marginTop: 30,
        }}
      ></View>
      <View style={styles.rincian}>
        <View style={{ width: 255 }}>
          <SemiBold style={{ textAlign: "right" }}>SUBTOTAL</SemiBold>
          <SemiBold style={{ textAlign: "right" }}>PENGIRIMAN</SemiBold>
          <SemiBold style={{ textAlign: "right" }}>BIAYA ADMIN</SemiBold>
          <SemiBold style={{ textAlign: "right" }}>TOTAL</SemiBold>
        </View>
        <View style={{ width: 120, paddingLeft: 20 }}>
          <Price>{format(200000)}</Price>
          <Price>{format(20000)}</Price>
          <Price>{format(2500)}</Price>
          <Price>{format(222500)}</Price>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 30,
        }}
      >
        <TouchablePrimary
          style={{ width: 180, height: 30 }}
          onPress={handleKonfirmasi}
        >
          Bayar Pesanan
        </TouchablePrimary>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Label: {
    fontSize: 16,
  },
  labelContainer: {
    flexDirection: "row",
  },
  produkContainer: {
    width: 70,
  },
  produkContent: {
    marginTop: 20,
  },
  img: {
    width: 70,
    height: 70,
  },
  rincian: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default BayarPesanan;
