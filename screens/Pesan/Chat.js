import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Header2 from "../../components/Header/Header2";
import Input from "../../components/Input";

const Chat = ({ navigation, route }) => {
  const [ketik, setKetik] = useState(null);
  const params = route.params;
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Header2 onPress={() => navigation.goBack()}>{params.nama}</Header2>
      <View style={styles.list}>
        <ScrollView style={{ maxHeight: "88%" }}>
          <View style={styles.penerima}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
          <View style={styles.pengirim}>
            <Text style={styles.pesan}>
              alsdmnasldknasdknasdnkasdklnasdklnasdklnasdklnasdnkasldnkasnk
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          marginTop: "auto",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Input
          style={{ width: 300, height: 41, marginRight: 20 }}
          placeholder="Ketik disini"
          onChangeText={(e) => setKetik(e)}
        />
        <TouchableOpacity onPress={() => console.log(ketik)}>
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: "contain",
            }}
            source={require("../../assets/img/icon/Send.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
  },
  penerima: {
    marginLeft: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: "#E1E1E1",
    maxWidth: 250,
    borderRadius: 10,
  },
  pengirim: {
    marginLeft: "auto",
    marginRight: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: "#746F6C",
    maxWidth: 250,
    borderRadius: 10,
  },
  pesan: {
    fontFamily: "LGC",
  },
});

export default Chat;
