import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import Price from "../../components/Price";
import { RadioButton } from "react-native-paper";
import TouchablePrimary from "../../components/TouchablePrimary";
import { AuthContext } from "../../auth/context";
import env from "../../constants/env";
import { DotIndicator } from "react-native-indicators";

const format = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const BayarPesanan = ({ navigation, route }) => {
  const user = useContext(AuthContext);
  const params = route.params;
  const [metode, setMetode] = useState("Transfer");
  const [data, setData] = useState({});
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleKonfirmasi = () => {
    if (metode === "Transfer") {
      navigation.navigate("Panduan", {
        idProduct: data.produk.id,
        user_id: 8,
        total:
          Number(
            data.tawar
              ? data.tawar.nominal
              : data.produk.promo
              ? data.produk.promo
              : data.produk.harga
          ) + 22500,
        metode_bayar: "transfer",
      });
    } else if (metode === "QRIS") {
      navigation.navigate("Panduan", {
        idProduct: data.produk.id,
        user_id: 8,
        total:
          Number(
            data.tawar
              ? data.tawar.nominal
              : data.produk.promo
              ? data.produk.promo
              : data.produk.harga
          ) + 22500,
        metode_bayar: "qris",
      });
    } else {
      navigation.navigate("Panduan", {
        idProduct: data.produk.id,
        user_id: 8,
        total:
          Number(
            data.tawar
              ? data.tawar.nominal
              : data.produk.promo
              ? data.produk.promo
              : data.produk.harga
          ) + 22500,
        metode_bayar: "cod",
      });
    }
  };

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/checkout/${params.id}?user_id=${user.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        {
          if (err.name === "AbortError") {
            console.log(err.name);
          } else {
            setErr(err.message);
            setLoading(false);
          }
        }
      });
    return () => {
      abortCont.abort();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Pembayaran</Header2>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
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
                      uri: `${env.url}/assets/img/uploads/produk/${data.produk.foto}`,
                      width: 72,
                      height: 72,
                    }}
                  />
                  <View style={{ width: 190, paddingLeft: 20 }}>
                    <SemiBold>{data.produk.nama_produk}</SemiBold>
                  </View>
                  <Price>
                    Rp.
                    {format(
                      data.tawar
                        ? data.tawar.nominal
                        : data.produk.promo
                        ? data.produk.promo
                        : data.produk.harga
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
              <Price>
                {format(
                  data.tawar
                    ? data.tawar.nominal
                    : data.produk.promo
                    ? data.produk.promo
                    : data.produk.harga
                )}
              </Price>
              <Price>{format(20000)}</Price>
              <Price>{format(2500)}</Price>
              <Price>
                {format(
                  Number(
                    data.tawar
                      ? data.tawar.nominal
                      : data.produk.promo
                      ? data.produk.promo
                      : data.produk.harga
                  ) + 22500
                )}
              </Price>
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
      )}
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
