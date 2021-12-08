import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SemiBold from "../../components/SemiBold";
import Input from "../../components/Input";
import Card from "../../components/Card";
import { DotIndicator } from "react-native-indicators";
import env from "../../constants/env";

const SearchResult = ({ navigation, route }) => {
  const params = route.params;
  const [Search, setSearch] = useState("");
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  console.log(params);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(
      `${env.url}/api/produk?min=${params.min ? params.min : ""}&daerah=${
        params.daerah ? params.daerah : ""
      }&search=${params.Search ? params.Search : ""}&max=${
        params.max ? params.max : ""
      }&kategori=${params.kategori ? params.kategori : ""}&sort=${
        params.urutkan
      }`,
      {
        signal: abortCont.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItem(data.produk);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name === "AbortError") {
          console.log(err);
        } else {
          setErr(err.message);
          setLoading(false);
        }
      });
    return () => abortCont.abort();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.searchbox}>
        <Input
          placeholder="Pencarian"
          style={styles.input}
          onChangeText={(e) => {
            setSearch(e);
          }}
          defaultValue={params.Search}
          onSubmitEditing={() =>
            navigation.push("SearchResult", { Search: Search })
          }
        />

        <Image
          style={{
            width: 18,
            height: 18,
            resizeMode: "stretch",
            position: "absolute",
            left: 220,
          }}
          source={require("../../assets/img/icon/Vector3.png")}
        />

        <View
          style={{
            width: 70,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Filter", { Search: params.Search });
            }}
          >
            <Image
              style={{ width: 18, height: 18, resizeMode: "stretch" }}
              source={require("../../assets/img/icon/Filter.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {!loading && !err && item.length === 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginTop: 50,
            }}
          >
            <SemiBold>Barang Tidak Ditemukan</SemiBold>
          </View>
        )}
        {err && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <SemiBold style={{ fontSize: 17.5 }}>{err}</SemiBold>
          </View>
        )}
        {loading && !err ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        ) : (
          <View style={{ marginTop: 10 }}>
            <View style={styles.item}>
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
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  searchbox: {
    marginTop: 50,
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    height: 46,
    width: 235,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default SearchResult;
