import React, { useState, useContext, useEffect } from "react";
import {
  View,
  RefreshControl,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../auth/context";
import Input from "../components/Input";
import SemiBold from "../components/SemiBold";
import Card from "../components/Card";
import COLOR from "../constants/COLOR";
import env from "../constants/env";
import { DotIndicator } from "react-native-indicators";

const Beranda = ({ navigation }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/rekomendasi/${user.userToken}`, {
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
  }, [user]);
  const onRefresh = function () {
    setRefreshing(true);
    const abortCont = new AbortController();
    fetch(`${env.url}/api/rekomendasi/${user.userToken}`, {
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
  const [Search, setSearch] = useState("");
  return (
    <View style={styles.screen}>
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
        <View style={{ flex: 1 }}>
          <View style={styles.searchbox}>
            <Input
              placeholder="Pencarian"
              style={styles.input}
              onChangeText={(e) => {
                setSearch(e);
              }}
              defaultValue={Search}
              onSubmitEditing={() =>
                navigation.navigate("SearchResult", { Search: Search })
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
              source={require("../assets/img/icon/Vector3.png")}
            />

            <View
              style={{
                width: 70,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ListScreen");
                }}
              >
                <Image
                  style={{ width: 18, height: 18, resizeMode: "stretch" }}
                  source={require("../assets/img/icon/Vector1.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notifikasi")}
              >
                <Image
                  style={{ width: 20, height: 20, resizeMode: "stretch" }}
                  source={require("../assets/img/icon/Vector2.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.category}>
              <SemiBold style={{ fontSize: 18 }}>Kategori</SemiBold>
              <View
                style={{
                  width: "100%",
                  marginTop: 15,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ width: 90 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", { Kategori: "Tas" });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,

                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/Tas.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: 90 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Baju Wanita",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,

                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/Baju-Wanita.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: 90 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Baju",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,

                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/Baju-Pria.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: 90 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Jam Tangan",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,

                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/Jam.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: 90 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Sepatu",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,

                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/Sepatu.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: 90, marginTop: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Game Console",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,

                        resizeMode: "contain",
                      }}
                      source={require("../assets/img/icon/Kategori/ps.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ width: 90, marginTop: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Sparepart",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/Sepedah.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{ width: 90, marginTop: 15, position: "relative" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Kategori", {
                        Kategori: "Handphone",
                      });
                    }}
                  >
                    <Image
                      style={{
                        width: 20,
                        height: 35,

                        left: 15,
                        resizeMode: "stretch",
                      }}
                      source={require("../assets/img/icon/Kategori/hp.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Kategori", { Kategori: "Lainya" });
                  }}
                >
                  <SemiBold style={{ fontSize: 15, color: COLOR.primary }}>
                    Lainya
                  </SemiBold>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 40 }}>
              <View style={{ marginLeft: 20 }}>
                <SemiBold style={{ fontSize: 20 }}>Rekomendasi</SemiBold>
              </View>
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
          </ScrollView>
        </View>
      )}
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
  category: {
    marginTop: 20,
    marginLeft: 20,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    // width: "100%",
    flexWrap: "wrap",
  },
});
export default Beranda;
