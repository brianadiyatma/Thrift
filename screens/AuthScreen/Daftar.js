import React, { createContext, useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import TouchablePrimary from "../../components/TouchablePrimary";
import Input from "../../components/Input";
import SemiBold from "../../components/SemiBold";
import { AuthContext } from "../../auth/context";
import { DotIndicator } from "react-native-indicators";

const Login = ({ navigation }) => {
  const context = useContext(AuthContext);
  const [nama, setNama] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <View style={styles.screen}>
      <View
        style={{ width: 80, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          style={styles.img}
          source={require("../../assets/img/Logo.png")}
        />
      </View>
      <View>
        <SemiBold />
        <Text style={{ fontFamily: "Montserrat-Semi-Bold", fontSize: 20 }}>
          Buat Akun Baru
        </Text>
      </View>
      <View style={{ margin: 5 }}>
        <Input
          onChangeText={(text) => setNama(text)}
          value={nama}
          placeholder="Nama"
        />
      </View>
      <View style={{ margin: 5 }}>
        <Input
          onChangeText={(text) => setTel(text)}
          value={tel}
          placeholder="Nomor Ponsel"
        />
      </View>
      <View style={{ margin: 5 }}>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
        />
      </View>
      <View style={{ margin: 5 }}>
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          type="password"
          secureTextEntry={true}
        />
      </View>
      <View style={{ margin: 5 }}>
        <Input
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Nama Pengguna"
        />
      </View>
      <View style={{ margin: 20, flexDirection: "row" }}>
        <Text style={{ fontFamily: "LGC-Bold" }}>Sudah memiliki akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(Login)}>
          <SemiBold style={{ fontWeight: "bold" }}>Masuk</SemiBold>
        </TouchableOpacity>
      </View>
      {context.loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <TouchablePrimary
          style={styles.btn}
          onPress={() =>
            context.authContext.signUp(nama, tel, email, password, username)
          }
        >
          Daftar
        </TouchablePrimary>
      )}
      <SemiBold style={{ color: "red" }}>{context.error.errDaftar}</SemiBold>
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
    width: 300,
    height: 50,
  },
  img: { width: 80, height: 100 },
});
export default Login;
