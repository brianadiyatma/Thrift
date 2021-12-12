import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import env from "../../constants/env";
import Price from "../../components/Price";
import { RadioButton } from "react-native-paper";
import TouchablePrimary from "../../components/TouchablePrimary";
import { AuthContext } from "../../auth/context";
import { DotIndicator } from "react-native-indicators";

const format = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ViewPesanan = ({ navigation, route }) => {
  const params = route.params;
  const [metode, setMetode] = useState(params.metode_bayar);
  console.log(params);
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Pembayaran</Header2>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginLeft: 20, marginTop: 20 }}>
          <SemiBold style={{ fontSize: 16 }}>Alamat</SemiBold>
          <Text style={{ fontFamily: "LGC-Bold", color: "#746F6C" }}>
            {params.namaRekening}
          </Text>
          <Text style={{ fontFamily: "LGC-Bold", color: "#746F6C" }}>
            {params.alamat}
          </Text>
          <Text style={{ fontFamily: "LGC-Bold", color: "#746F6C" }}>
            {params.kota}, {params.provinsi}
          </Text>
          <Text style={{ fontFamily: "LGC-Bold", color: "#746F6C" }}>
            {params.nomor}
          </Text>
        </View>
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
                  source={{
                    uri: `${params.foto}`,
                    width: 72,
                    height: 72,
                  }}
                />
                <View style={{ width: 190, paddingLeft: 20 }}>
                  <SemiBold>{params.nama_produk}</SemiBold>
                </View>
                <Price>
                  Rp
                  {format(params.total - (params.berat * 10000 + 2500))}
                </Price>
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
                    status={metode === "transfer" ? "checked" : "unchecked"}
                    onPress={() => setMetode("Transfer")}
                    color="black"
                    disabled={true}
                  />
                  <Price>Transfer</Price>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    value="second"
                    status={metode === "qris" ? "checked" : "unchecked"}
                    onPress={() => setMetode("QRIS")}
                    color="black"
                    disabled={true}
                  />
                  <Price>QRIS</Price>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton
                    value="second"
                    status={metode === "cod" ? "checked" : "unchecked"}
                    onPress={() => setMetode("COD")}
                    color="black"
                    disabled={true}
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
            <Price>
              {format(params.total - (params.berat * 10000 + 2500))}
            </Price>
            <Price>{format(params.berat * 10000)}</Price>
            <Price>{format(2500)}</Price>
            <Price>{format(params.total)}</Price>
          </View>
        </View>
      </ScrollView>
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
export default ViewPesanan;
