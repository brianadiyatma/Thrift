import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import SemiBold from "../components/SemiBold";
import Header2 from "../components/Header/Header2";

const notifikasi = ({ navigation }) => {
  const [data, setData] = useState([
    {
      judul: "Brian Adiyatma",
      isi: "Menolak penawaran anda untuk Sepatu Nike Kondisi 90%",
      id: 1,
    },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Notifikasi</Header2>
      <View style={styles.list}>
        {data.map((i) => (
          <View key={i.id} style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 10 }}>
              <SemiBold style={{ fontSize: 16 }}>{i.judul}</SemiBold>
              <SemiBold>{i.isi}</SemiBold>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    marginTop: 40,
    width: 320,
    marginLeft: 15,
  },
});
export default notifikasi;
