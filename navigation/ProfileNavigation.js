import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SemiBold from "../components/SemiBold";
import COLOR from "../constants/COLOR";
import Card from "../components/Card";
import Stars from "react-native-stars";

const Tab = createMaterialTopTabNavigator();

const ProfileNavigation = (props) => {
  const [item, setItem] = useState([
    { nama: "Sepatu Mulus", harga: "500000", id: 1, hargaPromo: 30000 },
    { nama: "Baju Mulus", harga: "600000", id: 2, hargaPromo: 30000 },
    { nama: "Jam Mulus", harga: "700000", id: 3, hargaPromo: 30000 },
    { nama: "Celana Jeans", harga: "800000", id: 5, hargaPromo: 30000 },
    { nama: "Celana Boxer", harga: "700000", id: 6, hargaPromo: 30000 },
    { nama: "Celana Dalam", harga: "600000", id: 7, hargaPromo: 30000 },
    { nama: "Celana Luar", harga: "500000", id: 8, hargaPromo: 30000 },
  ]);

  const Produk = ({ navigation }) => {
    return (
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.product}>
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
        </ScrollView>
      </View>
    );
  };
  const Review = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={{ marginTop: 20 }}></View>
        <View
          style={{
            paddingLeft: 30,
            borderBottomColor: "#e1e1e1",
            borderBottomWidth: 0.5,
            height: 120,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/img/Product/Sepatu.png")}
              style={{
                width: 65,
                height: 65,
                borderRadius: 65 / 2,
                overflow: "hidden",
              }}
            />
            <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
              <SemiBold style={{ fontSize: 17 }}>Sepatu Nike</SemiBold>
              <View style={{ marginTop: 8 }}>
                <Stars
                  display={2}
                  spacing={2}
                  count={5}
                  starSize={16}
                  fullStar={require("../assets/img/icon/star/fill.png")}
                  emptyStar={require("../assets/img/icon/star/border.png")}
                />
              </View>
              <SemiBold style={{ fontSize: 12, marginTop: 8 }}>
                @Winston Churcill
              </SemiBold>
            </View>
          </View>
          <SemiBold style={{ fontFamily: "LGC-Bold", marginTop: 20 }}>
            Sepatu Bagus Mulus Semoga awet
          </SemiBold>
        </View>
      </ScrollView>
    );
  };
  const Maps = () => {
    const [Maps, setMaps] = useState({
      latitude: 37.78,
      longitude: -122.43,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    return (
      <View>
        <Image
          source={{
            uri: "https://www.mapquestapi.com/staticmap/v5/map?locations=-7.6481360539638645,%20111.528595403975&size=@2x&key=3qK97t0M46g8eQsMj8k7iYJF1epq2LMH",
            width: 420,
            height: 420,
          }}
        />
      </View>
    );
  };
  return (
    <Tab.Navigator
      activeColor={COLOR.primary}
      tabBarOptions={{ indicatorStyle: { backgroundColor: COLOR.primary } }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#f0f0f0",
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Montserrat-Semi-Bold",
        },
      }}
    >
      <Tab.Screen name="Produk" component={Produk} />
      <Tab.Screen name="Review" component={Review} />
      <Tab.Screen name="Lokasi" component={Maps} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default ProfileNavigation;
