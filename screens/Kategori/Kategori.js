import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header1 from "../../components/Header/Header1";
import Card from "../../components/Card";
import env from "../../constants/env";
import { DotIndicator } from "react-native-indicators";

const Kategori = ({ route, navigation }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const params = route.params;

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

  return (
    <View style={styles.screen}>
      <Header1 navigation={navigation}>Promo</Header1>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.product}>
            {item.map((i) => (
              <Card
                key={i.id}
                id={i.id}
                hargaPromo={i.promo}
                nama={i.nama_produk}
                image={`${env.url}/assets/img/uploads/produk/${i.foto}`}
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
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default Kategori;
