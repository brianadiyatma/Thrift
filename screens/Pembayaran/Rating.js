import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import TouchablePrimary from "../../components/TouchablePrimary";
import env from "../../constants/env";

import { DotIndicator } from "react-native-indicators";
import Stars from "react-native-stars";

const Rating = ({ navigation, route }) => {
  const params = route.params;

  const [Text, setText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [star, setStar] = useState(0);

  const onSubmit = () => {
    setLoading(true);
    fetch(`${env.url}/api/pemesanan/${params.id} `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json", //prettier-ignore
      },
      body: JSON.stringify({
        rating: star,
        review: Text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Berhasil") {
          setStatus("Barang Berhasil Dikonfirmasi");
          console.log("Berhasil lurd");
          setTimeout(() => {
            setLoading(false);
            navigation.popToTop();
          }, 2000);
        }
      })
      .catch((err) => setStatus(err.message));
  };
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Penilaian</Header2>
      <ScrollView alignItems="center" style={{ flex: 1, marginTop: 30 }}>
        <View>
          <View style={{ alignItems: "center", marginBottom: 35 }}>
            <Stars
              half={true}
              default={0}
              update={(val) => {
                setStar(val);
              }}
              spacing={4}
              starSize={40}
              count={5}
              fullStar={require("../../assets/img/icon/star/fill.png")}
              emptyStar={require("../../assets/img/icon/star/border.png")}
              halfStar={require("../../assets/img/icon/star/half.png")}
            />
          </View>
        </View>
        <View>
          <SemiBold style={{ fontSize: 16 }}>Review</SemiBold>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({ text })}
            style={styles.inputDeskripsi}
            onChangeText={(e) => setText(e)}
          />
        </View>
        <View style={{ marginTop: 30, flex: 1 }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DotIndicator color="#FF8D44" />
            </View>
          ) : (
            <TouchablePrimary
              style={{ width: 300, height: 50 }}
              onPress={onSubmit}
            >
              Kirim
            </TouchablePrimary>
          )}
          <SemiBold style={{ marginTop: 15, textAlign: "center" }}>
            {status}
          </SemiBold>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    borderRadius: 18,
    borderColor: "#E1E1E1",
    marginTop: 20,
    height: 60,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  inputDeskripsi: {
    borderRadius: 18,
    textAlignVertical: "top",
    borderColor: "#E1E1E1",
    // backgroundColor: "#E1E1E1",
    marginTop: 20,
    height: 350,
    borderWidth: 2,
    padding: 10,
    width: 300,
  },
});
export default Rating;
