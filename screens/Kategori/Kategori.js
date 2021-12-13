import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import Header1 from "../../components/Header/Header1";
import Card from "../../components/Card";
import env from "../../constants/env";
import { DotIndicator } from "react-native-indicators";
import SemiBold from "../../components/SemiBold";

const Kategori = ({ route, navigation }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const params = route.params;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/produk?kategori=${params.Kategori}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.produk);
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

  const onRefresh = () => {
    setRefreshing(true);
    const abortCont = new AbortController();
    fetch(`${env.url}/api/produk?kategori=${params.Kategori}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.produk);
        setRefreshing(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setRefreshing(false);
        }
      });
    return () => abortCont.abort();
  };
  return (
    <View style={styles.screen}>
      <Header1 navigation={navigation}>{params.Kategori}</Header1>
      {err && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SemiBold style={{ fontSize: 17.5 }}>{err}</SemiBold>
        </View>
      )}
      {!loading && item.length === 0 && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <SemiBold>Tidak ada barang dikategori ini</SemiBold>
        </View>
      )}
      {loading && !err ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.product}>
            {item.map((i) => (
              <Card
                key={i.id}
                id={i.id}
                hargaPromo={i.promo}
                nama={i.nama_produk}
                image={`${i.url}`}
                harga={i.harga}
                onPress={() => {
                  navigation.navigate("ProductPage", {
                    itemId: i.id,
                  });
                }}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 65,
  },
  product: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default Kategori;
