import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header2 from "../../../components/Header/Header2";
import ProductList from "../../../components/ProductList";
import { DotIndicator } from "react-native-indicators";
import { AuthContext } from "../../../auth/context";
import env from "../../../constants/env";
import SemiBold from "../../../components/SemiBold";

const Pemesanan = ({ navigation }) => {
  const user = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/pemesanan?user_id=${user.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
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
    <View style={styles.screen}>
      <Header2 onPress={() => navigation.goBack()}>Pemesanan</Header2>
      <View style={{ flex: 1 }}>
        {!loading && item.pemesanan.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <SemiBold>Tidak Ada Pemesanan</SemiBold>
          </View>
        )}
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        )}

        {!loading && (
          <ScrollView>
            {item.pemesanan.map((i) => {
              if (
                i.status_pembeli === "Konfirmasi admin" ||
                i.status_pembeli === "Telah Dikonfirmasi" ||
                i.status_pembeli === "Selesai"
              ) {
                return (
                  <View style={{ marginTop: 45 }} key={i.id}>
                    <ProductList
                      imgurl={`${i.produk.url}`}
                      status={i.status_pembeli}
                      statusColor="black"
                      onPress={() =>
                        navigation.navigate("ViewPesanan", {
                          namaRekening: i.pembayaran.nama,
                          alamat: i.pembayaran.alamat,
                          kota: i.pembayaran.provinsi,
                          nomor: i.pembayaran.tel,
                          foto: i.produk.url,
                          nama_produk: i.produk.nama_produk,
                          total: i.pembayaran.total,
                          metode_bayar: i.pembayaran.metode_bayar,
                        })
                      }
                    >
                      {i.produk.nama_produk}
                    </ProductList>
                  </View>
                );
              } else if (i.status_pembeli === "Menunggu Pembayaran") {
                return (
                  <View style={{ marginTop: 45 }} key={i.id}>
                    <ProductList
                      imgurl={`${i.produk.url}`}
                      status={i.status_pembeli}
                      statusColor="black"
                      onPress={() => {
                        if (i.pembayaran.metode_bayar === "transfer") {
                          navigation.navigate("Transfer", { id: i.id });
                        } else if (i.pembayaran.metode_bayar === "qris") {
                          navigation.navigate("QRIS", { id: i.id });
                        }
                      }}
                    >
                      {i.produk.nama_produk}
                    </ProductList>
                  </View>
                );
              } else if (i.status_pembeli === "Proses") {
                return (
                  <View style={{ marginTop: 45 }} key={i.id}>
                    <ProductList
                      imgurl={`${i.produk.url}`}
                      status={i.status_pembeli}
                      statusColor="black"
                      onPress={() =>
                        navigation.navigate("KonfirmasiPaket", {
                          id: i.id,
                          namaRekening: i.pembayaran.nama,
                          alamat: i.pembayaran.alamat,
                          kota: i.pembayaran.provinsi,
                          nomor: i.pembayaran.tel,
                          foto: i.produk.url,
                          nama_produk: i.produk.nama_produk,
                          total: i.pembayaran.total,
                          metode_bayar: i.pembayaran.metode_bayar,
                        })
                      }
                    >
                      {i.produk.nama_produk}
                    </ProductList>
                  </View>
                );
              }
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Pemesanan;
