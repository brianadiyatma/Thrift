import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header2 from "../../../components/Header/Header2";
import SemiBold from "../../../components/SemiBold";
import TouchablePrimary from "../../../components/TouchablePrimary";
import { DotIndicator } from "react-native-indicators";
import env from "../../../constants/env";

const format = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const QRIS = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const params = route.params;
  const [err, setErr] = useState();
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/pemesanan/${params.id}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setLoading(false);
        }
      });
    return () => abortCont.abort();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.popToTop()}>Pembayaran</Header2>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <View style={styles.wrapper}>
          <View style={styles.total}>
            <SemiBold style={{ fontSize: 16 }}>Total</SemiBold>
            <Text style={{ fontSize: 18, marginTop: 10, fontFamily: "LGC" }}>
              Rp{format(data.pemesanan.pembayaran.total)}
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
            <SemiBold style={{ fontSize: 16 }}>Kode QR</SemiBold>
            <Text
              style={{ fontSize: 13, marginTop: 10, fontFamily: "LGC-Bold" }}
            >
              Silahkan transfer sesuai dengan jumlah ke rekening berikut:
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={require("../../../assets/img/MetodeBayar/QRIS.png")}
            />
          </View>
          <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
            <TouchablePrimary
              style={{ width: 300, height: 40 }}
              onPress={() => {
                navigation.navigate("FormKonfirmasi", data);
              }}
            >
              Konfirmasi pembayaran
            </TouchablePrimary>
          </View>
        </View>
      )}
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
  },
  img: {
    width: 300,
    height: 300,
  },
});

export default QRIS;
