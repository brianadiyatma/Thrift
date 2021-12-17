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

const KonfirmasiPesanan = ({ navigation, route }) => {
  const params = route.params;
  const user = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [metode, setMetode] = useState(
    params.pemesanan.pembayaran.metode_bayar
  );
  console.log(params);
  const [err, setErr] = useState(null);
  const onKonfirmasi = () => {
    setLoading(true);
    fetch(`${env.url}/api/pembayaran/${params.pemesanan.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.userToken,
        nama_bank: params.bank,
        nomor_rekening: params.nomorRekening,
        nama: params.namaRekening,
        alamat: `${params.alamat}, ${params.detail}`,
        provinsi: params.provinsi.name,
        kota: params.kota.name,
        tel: params.nomor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Berhasil") {
          navigation.popToTop();
        } else {
          const res = Object.values(data.error);
          setErr(res[0][0]);
        }
      })
      .catch((err) => setErr(err.message));
  };
  const onBatal = () => {
    setLoading(true);
    fetch(`${env.url}/api/pembayaran/${params.pemesanan.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.userToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          navigation.popToTop();
        } else {
          const res = Object.values(data.error);
          setErr(res[0][0]);
        }
      })
      .catch((err) => setErr(err.message));
  };
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
            {params.alamat}, {params.detail}
          </Text>
          <Text style={{ fontFamily: "LGC-Bold", color: "#746F6C" }}>
            {params.provinsi.name}, {params.kota.name}
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
                    uri: `${params.pemesanan.produk.url}`,
                    width: 72,
                    height: 72,
                  }}
                />
                <View style={{ width: 190, paddingLeft: 20 }}>
                  <SemiBold>{params.pemesanan.produk.nama_produk}</SemiBold>
                </View>
                <Price>
                  Rp
                  {format(
                    params.pemesanan.pembayaran.total -
                      (params.pemesanan.produk.berat * 10000 + 2500)
                  )}
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
                  <Price>Bayar di Tempat</Price>
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
              {format(
                params.pemesanan.pembayaran.total -
                  (params.pemesanan.produk.berat * 10000 + 2500)
              )}
            </Price>
            <Price>{format(params.pemesanan.produk.berat * 10000)}</Price>
            <Price>{format(2500)}</Price>
            <Price>{format(params.pemesanan.pembayaran.total)}</Price>
          </View>
        </View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
              marginLeft: 10,
              marginRight: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchablePrimary
              style={{ width: 180, height: 30, backgroundColor: "#BA0000" }}
              onPress={onBatal}
            >
              Pembatalan
            </TouchablePrimary>
            <TouchablePrimary
              style={{ width: 180, height: 30 }}
              onPress={onKonfirmasi}
            >
              Konfirmasi
            </TouchablePrimary>
          </View>
        )}
        <SemiBold style={{ textAlign: "center", color: "red", marginTop: 15 }}>
          {err}
        </SemiBold>
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
export default KonfirmasiPesanan;
