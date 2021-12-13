import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header1 from "../components/Header/Header1";
import Card from "../components/Card";
import env from "../constants/env";
import { DotIndicator } from "react-native-indicators";
import { AuthContext } from "../auth/context";
import SemiBold from "../components/SemiBold";
import TouchablePrimary from "../components/TouchablePrimary";

const Disukai = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const user = useContext(AuthContext);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/wishlist?user_id=${user.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setLoading(false);
        }
      });
    return () => abortCont.abort();
  }, []);

  const muatUlang = () => {
    setLoading(true);
    fetch(`${env.url}/api/wishlist?user_id=${user.userToken}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setLoading(false);
        }
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetch(`${env.url}/api/wishlist?user_id=${user.userToken}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setRefreshing(false);
      })
      .catch((err) => {
        setErr(err.message);
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setRefreshing(false);
        }
      });
  };
  return (
    <View style={styles.screen}>
      <Header1 navigation={navigation}>Disukai</Header1>
      {err && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SemiBold style={{ fontSize: 17.5 }}>{err}</SemiBold>
        </View>
      )}
      {!loading && !err && item.wishlist.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SemiBold>Tidak Ada Barang Disukai</SemiBold>
          <TouchablePrimary
            style={{ width: 200, height: 40, marginTop: 40 }}
            onPress={muatUlang}
          >
            Muat Ulang
          </TouchablePrimary>
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
            {item.wishlist.map((i) => (
              <Card
                key={i.id}
                id={i.id}
                hargaPromo={i.produk.promo}
                nama={i.produk.nama_produk}
                image={`${i.produk.url}`}
                harga={i.produk.harga}
                onPress={() => {
                  navigation.navigate("ProductPage", {
                    itemId: i.produk.id,
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
    // justifyContent: "space-evenly",
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default Disukai;
