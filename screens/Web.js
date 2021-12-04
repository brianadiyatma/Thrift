import React from "react";
import { View, Text } from "react-native";
import Header2 from "../components/Header/Header2";
import SemiBold from "../components/SemiBold";

const Web = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Notifikasi</Header2>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SemiBold style={{ textAlign: "center" }}>
          Silahkan Membuka web untuk memproses kebutuhan pembeli
        </SemiBold>
      </View>
    </View>
  );
};

export default Web;
