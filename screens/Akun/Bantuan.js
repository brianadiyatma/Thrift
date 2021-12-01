import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import TouchablePrimary from "../../components/TouchablePrimary";
import env from "../../constants/env";
import { AuthContext } from "../../auth/context";
import { DotIndicator } from "react-native-indicators";

const Bantuan = ({ navigation }) => {
  const { userToken: userId } = useContext(AuthContext);
  const [Text, setText] = useState({ judul: null, deskripsi: null });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const onSubmit = () => {
    setLoading(true);
    fetch(`${env.url}/api/bantuan `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json", //prettier-ignore
      },
      body: JSON.stringify({
        user_id: userId,
        permasalahan: Text.judul,
        pesan: Text.deskripsi,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Berhasil") {
          setStatus("Bantuan Berhasil Dikirim");
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
      <Header2 onPress={() => navigation.goBack()}>Bantuan</Header2>
      <ScrollView alignItems="center" style={{ flex: 1, marginTop: 30 }}>
        <View>
          <SemiBold style={{ fontSize: 16 }}>Permasalahan</SemiBold>
          <TextInput
            placeholder="Permasalahan"
            style={styles.inputTitle}
            onChangeText={(e) => setText({ ...Text, judul: e })}
          />
        </View>
        <View>
          <SemiBold style={{ fontSize: 16 }}>Deskripsi</SemiBold>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({ text })}
            style={styles.inputDeskripsi}
            onChangeText={(e) => setText({ ...Text, deskripsi: e })}
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
    backgroundColor: "#E1E1E1",
    marginTop: 20,
    height: 350,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
});
export default Bantuan;
