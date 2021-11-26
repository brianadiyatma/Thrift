import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SemiBold from "../../components/SemiBold";
import Header2 from "../../components/Header/Header2";

const Akun = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header2 onPress={() => navigation.goBack()}>Riwayat</Header2>

      <View style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Pemesanan")}>
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Pemesanan</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Penawaran</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default Akun;
