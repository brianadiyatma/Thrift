import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import TouchablePrimary from "../../components/TouchablePrimary";
import Input from "../../components/Input";
import SemiBold from "../../components/SemiBold";
import { AuthContext } from "../../auth/context";
import { DotIndicator } from "react-native-indicators";

const Login = ({ navigation }) => {
  const context = useContext(AuthContext);
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    context.authContext.signIn(nama, password);
  };

  return (
    <View style={styles.screen}>
      <View
        style={{ width: 150, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={styles.img}
          source={require("../../assets/img/Logo.png")}
        />
      </View>
      <View style={{ margin: 20 }}>
        <Input
          placeholder="Nama Pengguna"
          onChangeText={(text) => setNama(text)}
          value={nama}
        />
      </View>
      <View style={{ margin: 20 }}>
        <Input
          secureTextEntry={true}
          placeholder="Kata Sandi"
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>
      <View style={{ marginBottom: 5, flexDirection: "row" }}>
        <Text style={{ fontFamily: "LGC-Bold" }}>Belum Punya Akun ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Daftar")}>
          <SemiBold style={{ fontWeight: "bold" }}>Daftar</SemiBold>
        </TouchableOpacity>
      </View>
      {context.loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <TouchablePrimary style={styles.btn} onPress={handleLogin}>
          Masuk
        </TouchablePrimary>
      )}
      <View>
        <SemiBold style={{ color: "red" }}>{context.error.errLogin}</SemiBold>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf8f8",
  },
  btn: {
    marginTop: 20,
    width: 300,
    height: 50,
  },
  img: { width: 160, height: 200 },
});
export default Login;
