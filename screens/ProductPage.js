import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share
} from "react-native";
import SemiBold from "../components/SemiBold";
import Price from "../components/Price";
import COLOR from "../constants/COLOR";
import Medium from "../components/Medium";
import TouchablePrimary from "../components/TouchablePrimary";
import asset from "../components/asset";


const format = (amount) => {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&.");
};

const productPage = ({ navigation }) => {
  const [data, setData] = useState({
    nama: "Sepatu Mulus",
    harga: "50000",
    hargaPromo: "20000",
    description:
      "Produk sepatu nike dengan kondisi 90% pemakaian 2 kali. Sepatu sudah dicuci dan siap dipakai. Bonus dengan box dan paper bag asli. Warna hitam, lecet sedikit dibagian samping. \n Bahan : kulit \n Size : 70 \n Tipe: casual \n Bahan : kulit \n Size : 70 \n Tipe: casual",
    id: 12,
  });

  const myCustomShare = async () => {
    try {
      await Share.share({
        message: `Beli barang ini ${data.nama} di aplikasi Thrift \ thrift.com/products/${data.id}`,
        urls: asset.url,
      });
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.top}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={require("../assets/img/Product/Sepatu.png")}
          />
          <TouchableOpacity
            style={{ position: "absolute", left: 30, top: 60 }}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
              source={require("../assets/img/icon/Arah.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <View style={{ width: "70%" }}>
            <SemiBold style={{ fontSize: 17.5 }}>
              Sepatu Nike Kondisi 90%
            </SemiBold>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: 100,
            }}
          >
            <TouchableOpacity styles={{ marginRight: 5 }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={require("../assets/img/icon/Heart.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={myCustomShare}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={require("../assets/img/icon/Share.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.description}>
          <View style={{ flexDirection: "row" }}>
            <Price>Rp.</Price>
            <Price
              style={{
                fontSize: 15,
                textDecorationLine: data.hargaPromo ? "line-through" : "none",
              }}
            >
              {format(data.harga)}
            </Price>
          </View>
          {data.hargaPromo && (
            <Price
              style={{
                fontSize: 15,
                color: COLOR.primary,
              }}
            >
              Rp.{format(data.hargaPromo)}
            </Price>
          )}
          <View style={{ marginTop: 10 }}>
            <Medium>{data.description}</Medium>
          </View>
        </View>
        <View style={styles.profile}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.profileImage}>
              <Image
                style={styles.profileImage}
                source={require("../assets/img/imageProfile/adolf.jpg")}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfilePenjual")}
            >
              <View style={{ marginLeft: 10 }}>
                <SemiBold>Brian Adiyatma</SemiBold>
                <Medium style={{ marginTop: 5 }}>@Brian1520</Medium>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../assets/img/icon/Vector1.png")}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchablePrimary
          style={{ width: 154, height: 35 }}
          onPress={() => navigation.navigate("BayarPesanan")}
        >
          Beli
        </TouchablePrimary>
        <TouchablePrimary
          style={{ width: 154, height: 35 }}
          onPress={() => navigation.navigate("Tawar")}
        >
          Tawar
        </TouchablePrimary>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    width: "100%",
    height: 400,
  },
  image: {
    width: "100%",
    height: 400,
  },
  title: {
    width: "100%",
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  description: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: 20,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    overflow: "hidden",
  },
  profile: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default productPage;
