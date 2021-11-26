import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header1 from "../components/Header/Header1";
import Card from "../components/Card";

const Promo = ({ navigation }) => {
  const [item, setItem] = useState([
    { nama: "Sepatu Mulus", harga: "500000", id: 1, hargaPromo: 30000 },
    { nama: "Baju Mulus", harga: "600000", id: 2, hargaPromo: 30000 },
    { nama: "Jam Mulus", harga: "700000", id: 3, hargaPromo: 30000 },
    { nama: "Celana Jeans", harga: "800000", id: 5, hargaPromo: 30000 },
    { nama: "Celana Boxer", harga: "700000", id: 6, hargaPromo: 30000 },
    { nama: "Celana Dalam", harga: "600000", id: 7, hargaPromo: 30000 },
    { nama: "Celana Luar", harga: "500000", id: 8, hargaPromo: 30000 },
  ]);
  return (
    <View style={styles.screen}>
      <Header1 navigation={navigation}>Disukai</Header1>
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

export default Promo;
