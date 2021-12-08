import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SemiBold from "../components/SemiBold";
import COLOR from "../constants/COLOR";
import Card from "../components/Card";
import Stars from "react-native-stars";
import env from "../constants/env";

const Tab = createMaterialTopTabNavigator();

const ProfileNavigation = ({ data }) => {
  const Produk = ({ navigation }) => {
    return (
      <View style={styles.screen}>
        <ScrollView>
          <View style={styles.product}>
            {data.produk.length === 0 && (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <SemiBold>Tidak Ada review</SemiBold>
              </View>
            )}
            {data.produk.map((i) => (
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
        <View style={{ flex: 1 }}>
          {data.review.length === 0 && (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <SemiBold>Tidak Ada review</SemiBold>
            </View>
          )}
          {data.review.map((i, j) => (
            <View
              key={j}
              style={{
                paddingLeft: 30,
                borderBottomColor: "#e1e1e1",
                borderBottomWidth: 0.5,
                height: 150,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{
                    uri: `${i.produk.url}`,
                    width: 65,
                    height: 65,
                  }}
                  style={{
                    borderRadius: 65 / 2,
                    overflow: "hidden",
                  }}
                />
                <View style={{ alignItems: "flex-start", marginLeft: 20 }}>
                  <SemiBold style={{ fontSize: 17 }}>
                    {i.produk.nama_produk}
                  </SemiBold>
                  <View style={{ marginTop: 8 }}>
                    <Stars
                      display={Number(i.rating)}
                      spacing={2}
                      count={5}
                      starSize={16}
                      fullStar={require("../assets/img/icon/star/fill.png")}
                      emptyStar={require("../assets/img/icon/star/border.png")}
                    />
                  </View>
                  <SemiBold style={{ fontSize: 12, marginTop: 8 }}>
                    @{i.user.username}
                  </SemiBold>
                </View>
              </View>
              <SemiBold style={{ fontFamily: "LGC-Bold", marginTop: 20 }}>
                {i.review}
              </SemiBold>
            </View>
          ))}
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
            uri: `https://www.mapquestapi.com/staticmap/v5/map?locations=${data.lat},%20${data.lng}&size=@2x&key=3qK97t0M46g8eQsMj8k7iYJF1epq2LMH`,
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
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#f0f0f0",
        },
        tabBarIndicatorStyle: { backgroundColor: COLOR.primary },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "Montserrat-Semi-Bold",
        },
      }}
    >
      <Tab.Screen name="Produk" component={Produk} />
      <Tab.Screen name="Review" component={Review} />
      <Tab.Screen
        name="Lokasi"
        component={Maps}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/img/icon/SVG/Lokasi.png")}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLOR.primary : COLOR.black,
                  marginBottom: 5,
                }}
              />
            </View>
          ),
        }}
      />
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
