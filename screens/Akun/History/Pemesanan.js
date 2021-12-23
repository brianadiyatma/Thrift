import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);
  const abortCont = new AbortController();
  useEffect(() => {
    fetch(`${env.url}/api/pemesanan?user_id=${user.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setLoading(false);
          setRefreshing(false);
        }
      });
    return () => abortCont.abort();
  }, [refreshing]);

  console.log(item);
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
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
          >
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
                      navigation={navigation}
                      statusColor="black"
                      penjual={i.penjual}
                      onPress={() =>
                        navigation.navigate("ViewPesanan", {
                          namaRekening: i.pembayaran.nama,
                          alamat: i.pembayaran.alamat,
                          kota: i.pembayaran.provinsi,
                          nomor: i.pembayaran.tel,
                          foto: i.produk.url,
                          nama_produk: i.produk.nama_produk,
                          berat: i.produk.berat,
                          total: i.pembayaran.total,
                          metode_bayar: i.pembayaran.metode_bayar,
                          nounik: i.pembayaran.nounik,
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
                      navigation={navigation}
                      penjual={i.penjual}
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
                      navigation={navigation}
                      penjual={i.penjual}
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
                          berat: i.produk.berat,
                          total: i.pembayaran.total,
                          metode_bayar: i.pembayaran.metode_bayar,
                          nounik: i.pembayaran.nounik,
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
