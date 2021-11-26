import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Header2 from "../../components/Header/Header2";
import TouchablePrimary from "../../components/TouchablePrimary";

const Tawar = ({ navigation }) => {
  const [tawar, setTawar] = useState();
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Buat Penawaran</Header2>
      <View style={styles.FormContainer}>
        <TextInput
          style={styles.input}
          textAlign={"center"}
          placeholder="Masukan Harga"
          value={tawar}
          onChangeText={(text) => {
            setTawar(text);
          }}
        />
        <TouchablePrimary style={{ height: 35, width: 150 }}>
          Tawar
        </TouchablePrimary>
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
