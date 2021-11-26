import React, { useState } from "react";
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
const SearchResult = ({ navigation, route }) => {
  const [item, setItem] = useState([
    { nama: "Sepatu Mulus", harga: "50000", hargaPromo: 30000, id: 1 },
    { nama: "Baju Mulus", harga: "60000", hargaPromo: 30000, id: 2 },
    { nama: "Jam Mulus", harga: "70000", hargaPromo: 30000, id: 3 },
    { nama: "Celana Jeans", harga: "80000", hargaPromo: 30000, id: 5 },
    { nama: "Celana Boxer", harga: "70000", hargaPromo: 30000, id: 6 },
    { nama: "Celana Dalam", harga: "60000", hargaPromo: 30000, id: 7 },
    { nama: "Celana Luar", harga: "50000", hargaPromo: 30000, id: 8 },
  ]);
  const params = route.params;
  return (
    <View style={styles.screen}>
      <View style={styles.searchbox}>
        <Input placeholder={params.Search} style={styles.input} />

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
              navigation.navigate("Filter");
            }}
          >
            <Image
              style={{ width: 18, height: 18, resizeMode: "stretch" }}
              source={require("../../assets/img/icon/Filter.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginTop: 10 }}>
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

  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default SearchResult;
