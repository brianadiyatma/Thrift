import React, { useState, useEffect } from "react";
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

const Promo = ({ navigation }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/produk?promo=true`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.produk);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((err) => {
        setErr(err.message);
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

  return (
    <View style={styles.screen}>
      <Header1 navigation={navigation}>Promo</Header1>
      {err && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SemiBold style={{ fontSize: 17.5 }}>{err}</SemiBold>
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
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
    // justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default Promo;
