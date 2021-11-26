import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header1 from "../components/Header/Header1";
import Card from "../components/Card";

const Promo = ({ navigation }) => {
  const [item, setItem] = useState([
    { nama: "Sepatu Mulus", harga: "50000", hargaPromo: 30000, id: 1 },
    { nama: "Baju Mulus", harga: "60000", hargaPromo: 30000, id: 2 },
    { nama: "Jam Mulus", harga: "70000", hargaPromo: 30000, id: 3 },
    { nama: "Celana Jeans", harga: "80000", hargaPromo: 30000, id: 5 },
    { nama: "Celana Boxer", harga: "70000", hargaPromo: 30000, id: 6 },
    { nama: "Celana Dalam", harga: "60000", hargaPromo: 30000, id: 7 },
    { nama: "Celana Luar", harga: "50000", hargaPromo: 30000, id: 8 },
  ]);
  return (
    <View style={styles.screen}>
      <Header1 navigation={navigation}>Promo</Header1>
      <ScrollView>
        <View style={styles.product}>
          {item.map((i) => (
            <Card
              key={i.id}
              id={i.id}
              nama={i.nama}
              harga={i.harga}
              hargaPromo={i.hargaPromo}
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
