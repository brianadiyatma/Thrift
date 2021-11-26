import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header2 from "../../../components/Header/Header2";
import SemiBold from "../../../components/SemiBold";
import TouchablePrimary from "../../../components/TouchablePrimary";

const format = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const Transfer = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Pembayaran</Header2>
      <View style={styles.total}>
        <SemiBold style={{ fontSize: 16 }}>Total</SemiBold>
        <Text style={{ fontSize: 18, marginTop: 10, fontFamily: "LGC" }}>
          Rp{format(155000)}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "#E1E1E1",
          borderBottomWidth: 1,
          marginTop: 30,
        }}
      ></View>
      <View style={styles.metode}>
        <SemiBold style={{ fontSize: 16 }}>Transfer Bank</SemiBold>
        <Text style={{ fontSize: 13, marginTop: 10, fontFamily: "LGC-Bold" }}>
          Silahkan transfer sesuai dengan jumlah ke rekening berikut:
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.img}
            resizeMode="contain"
            source={require("../../../assets/img/MetodeBayar/BCA.png")}
          />
          <View style={{ marginLeft: "20%" }}>
            <Text>Bank: BCA</Text>
            <Text>Nomor rekening: 220917338</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
        <TouchablePrimary
          style={{ width: 300, height: 40 }}
          onPress={() => {
            navigation.navigate("FormKonfirmasi");
          }}
        >
          Konfirmasi pembayaran
        </TouchablePrimary>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  total: {
    marginTop: 30,
    marginLeft: 20,
    width: "100%",
    height: 50,
  },
  metode: {
    marginTop: 10,
    marginLeft: 20,
    width: "100%",
    height: 150,
  },
  img: {
    width: 90,
    height: 90,
  },
});

export default Transfer;
