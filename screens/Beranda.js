import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Input from "../components/Input";
import SemiBold from "../components/SemiBold";
import Card from "../components/Card";
import COLOR from "../constants/COLOR";


const Beranda = ({ navigation }) => {
  const [item, setItem] = useState([
    { nama: "Sepatu Mulus", harga: "500000", id: 1 },
    { nama: "Baju Mulus", harga: "600000", id: 2 },
    { nama: "Jam Mulus", harga: "700000", id: 3 },
    { nama: "Celana Mulus", harga: "800000", id: 4 },
  ]);

  const [Search, setSearch] = useState("");

  return (
    <View style={styles.screen}>
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
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={{ width: 18, height: 18, resizeMode: "stretch" }}
              source={require("../assets/img/icon/Vector1.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notifikasi")}>
            <Image
              style={{ width: 20, height: 20, resizeMode: "stretch" }}
              source={require("../assets/img/icon/Vector2.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
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
                  navigation.navigate("Kategori", { Kategori: "Baju Wanita" });
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
                  navigation.navigate("Kategori", { Kategori: "Baju Pria" });
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
                  navigation.navigate("Kategori", { Kategori: "Jam" });
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
                  navigation.navigate("Kategori", { Kategori: "Game Console" });
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
                  navigation.navigate("Kategori", { Kategori: "Kendaraan" });
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
            <View style={{ width: 90, marginTop: 15, position: "relative" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Kategori", { Kategori: "Handphone" });
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
                nama={i.nama}
                harga={i.harga}
                onPress={() => {
                  navigation.navigate("ProductPage");
                }}
              />
            ))}
          </View>
        </View>
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
  category: {
    marginTop: 20,
    marginLeft: 20,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});
export default Beranda;
