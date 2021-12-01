import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Header2 from "../../components/Header/Header2";
import TouchablePrimary from "../../components/TouchablePrimary";
import { AuthContext } from "../../auth/context";
import { DotIndicator } from "react-native-indicators";
import env from "../../constants/env";
import SemiBold from "../../components/SemiBold";

const UbahData = ({ navigation }) => {
  const { userToken: userId } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/user/${userId}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data.user);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setErr(err.message);
          setLoading(false);
        }
      });
    return () => abortCont.abort();
  }, []);
  const onSubmit = () => {
    console.log("Submitting");
    setLoadingButton(true);
    fetch(`${env.url}/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json", //prettier-ignore
      },
      body: JSON.stringify({
        name: item.name,
        email: item.email,
        username: item.username,
        password: item.password,
        tel: item.tel,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Success");

        setStatus("Berhasil Diubah");
        setTimeout(() => {
          navigation.popToTop();
          setLoadingButton(false);
        }, 2000);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log(err.name);
        } else {
          setStatus(err.message);
          setLoadingButton(false);
        }
      });
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && !err ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Header2 onPress={() => navigation.goBack()}>Ubah Data</Header2>
          <ScrollView style={{ flex: 1, marginTop: 40 }}>
            <View>
              <View style={styles.formWrapper}>
                <Text style={{ fontFamily: "LGC", color: "#746F6C" }}>
                  Nama
                </Text>
                <TextInput
                  value={item.name}
                  style={styles.input}
                  placeholder="Nama"
                  onChangeText={(text) => {
                    setItem({ ...item, name: text });
                  }}
                />
              </View>
              <View style={styles.formWrapper}>
                <Text style={{ fontFamily: "LGC", color: "#746F6C" }}>
                  Nama Pengguna
                </Text>
                <TextInput
                  value={item.username}
                  style={styles.input}
                  placeholder="Nama Pengguna"
                  onChangeText={(text) => {
                    setItem({ ...item, username: text });
                  }}
                />
              </View>
              <View style={styles.formWrapper}>
                <Text style={{ fontFamily: "LGC", color: "#746F6C" }}>
                  Email
                </Text>
                <TextInput
                  value={item.email}
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={(text) => {
                    setItem({ ...item, email: text });
                  }}
                />
              </View>
              <View style={styles.formWrapper}>
                <Text style={{ fontFamily: "LGC", color: "#746F6C" }}>
                  Password
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    setItem({ ...item, password: text });
                  }}
                />
              </View>
              <View style={styles.formWrapper}>
                <Text style={{ fontFamily: "LGC", color: "#746F6C" }}>
                  Nomor Ponsel
                </Text>
                <TextInput
                  value={item.tel}
                  style={styles.input}
                  placeholder="Nomor Ponsel"
                  onChangeText={(text) => {
                    setItem({ ...item, tel: text });
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: 36 }}>
              {loadingButton ? (
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
                  style={{ width: 200, height: 40 }}
                  onPress={onSubmit}
                >
                  Simpan
                </TouchablePrimary>
              )}
              {status && (
                <SemiBold style={{ marginTop: 20 }}>{status}</SemiBold>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    marginTop: 25,
    marginLeft: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    padding: 5,
    height: 40,
  },
});

export default UbahData;
