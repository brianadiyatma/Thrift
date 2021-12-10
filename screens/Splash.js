import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import SemiBold from "../components/SemiBold";
import TouchablePrimary from "../components/TouchablePrimary";

const Splash = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image style={styles.img} source={require("../assets/img/Logo.png")} />
        <View>
          <TouchablePrimary
            style={styles.btn}
            onPress={() => navigation.navigate("Daftar")}
          >
            Daftar
          </TouchablePrimary>
        </View>
        <View style={{ marginBottom: 5, flexDirection: "row", marginTop: 20 }}>
          <Text style={{ fontFamily: "LGC-Bold" }}>Sudah Memiliki Akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <SemiBold style={{ fontWeight: "bold" }}>Login</SemiBold>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  img: { width: 160, height: 200 },
  btn: { width: 250, height: 50, marginTop: 80 },
});
export default Splash;
