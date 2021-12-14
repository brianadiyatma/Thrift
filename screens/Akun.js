import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SemiBold from "../components/SemiBold";
import { AuthContext } from "../auth/context";

const Akun = ({ navigation }) => {
  const context = useContext(AuthContext);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <SemiBold style={{ fontSize: 20 }}>Akun</SemiBold>
      </View>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity onPress={() => navigation.navigate("UbahData")}>
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Ubah Data</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Riwayat")}>
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Riwayat</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Bantuan")}>
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Bantuan</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ListScreen")}>
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Pesan</SemiBold>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            context.authContext.signOut();
          }}
        >
          <View
            style={{
              marginVertical: 10,
              height: 40,
              borderBottomColor: "black",
              borderBottomWidth: 0.5,
            }}
          >
            <View style={{ marginLeft: 25 }}>
              <SemiBold style={{ fontSize: 20 }}>Keluar</SemiBold>
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
    paddingTop: 65,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default Akun;
