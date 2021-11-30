import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header2 from "../../../components/Header/Header2";
import ProductList from "../../../components/ProductList";

const Penawaran = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header2 onPress={() => navigation.goBack()}>Penawaran</Header2>
      <View style={{ marginTop: 45 }}>
        <ProductList
          imgurl="https://assets.ajio.com/medias/sys_master/root/h5a/h59/13018715881502/-1117Wx1400H-460342492-blue-MODEL.jpg"
          status="Konfirmasi Admin"
          statusColor="green"
        >
          Sepatu Nike
        </ProductList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Penawaran;
