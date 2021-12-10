import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Header2 from "../../components/Header/Header2";
import TouchablePrimary from "../../components/TouchablePrimary";
import env from "../../constants/env";
import { DotIndicator } from "react-native-indicators";
import SemiBold from "../../components/SemiBold";

const Tawar = ({ navigation, route }) => {
  const parameter = route.params;
  const [tawar, setTawar] = useState();
  const [loading, setLoading] = useState(false);
  const [berhasil, setBerhasil] = useState(null);

  const onSubmit = () => {
    setLoading(true);
    fetch(`${env.url}/api/penawaran/${parameter.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json", //prettier-ignore
      },
      body: JSON.stringify({
        user_id: parameter.userID,
        nominal: tawar,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Berhasil") {
          setBerhasil("Penawaran Berhasil Dikirim");
          setTimeout(() => {
            setLoading(false);
            navigation.popToTop();
          }, 3500);
        } else {
          const err = Object.values(data.errors);
          throw Error(err[0][0]);
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Buat Penawaran</Header2>
      <View style={styles.FormContainer}>
        <TextInput
          style={styles.input}
          textAlign={"center"}
          placeholder="Masukan Harga"
          value={tawar}
          keyboardType="numeric"
          onChangeText={(text) => {
            setTawar(text);
          }}
        />
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        ) : (
          <TouchablePrimary
            onPress={onSubmit}
            style={{ height: 35, width: 150 }}
          >
            Tawar
          </TouchablePrimary>
        )}
        <SemiBold>{berhasil}</SemiBold>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 261,
    height: 48,
    backgroundColor: "#E1E1E1",
  },
  FormContainer: {
    marginTop: 100,
    height: 120,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Tawar;
