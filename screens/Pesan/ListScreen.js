import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import SemiBold from "../../components/SemiBold";
import Header2 from "../../components/Header/Header2";
import env from "../../constants/env";
import { AuthContext } from "../../auth/context";
import { DotIndicator } from "react-native-indicators";

const ListScreen = ({ navigation }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Pesan</Header2>
      <View style={{ flex: 1 }}>
        <View style={styles.list}>
          <TouchableOpacity
            key={1}
            onPress={() =>
              navigation.navigate("Chat", { id: 1, nama: "Nabil Islam" })
            }
          >
            <View
              key={1}
              style={{
                flexDirection: "row",
                margin: 12,
                height: 50,
              }}
            >
              <View style={{ marginLeft: 25 }}>
                <SemiBold style={{ fontSize: 16 }}>"Nabil Islam"</SemiBold>
                <SemiBold>Apakah barang ini bisa kurang ?</SemiBold>
              </View>
            </View>
            <View style={{ borderBottomWidth: 1, borderColor: "black" }}></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
  },
});
export default ListScreen;
