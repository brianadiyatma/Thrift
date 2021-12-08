import React from "react";
import { View, Text, Image } from "react-native";
import TouchablePrimary from "../../components/TouchablePrimary";

const SuccessBantuan = ({ navigation }) => {
  console.log(navigation);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 90 }}
          source={require("../../assets/img/icon/centang.png")}
        />
        <Text style={{ fontFamily: "LGC-Bold", marginTop: 50 }}>
          Bantuan Telah Dikirim ke Admin
        </Text>
        <TouchablePrimary
          style={{ width: 200, height: 30, marginTop: 50 }}
          onPress={() => navigation.popToTop()}
        >
          Kembali
        </TouchablePrimary>
      </View>
    </View>
  );
};

export default SuccessBantuan;
