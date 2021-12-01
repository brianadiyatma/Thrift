import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SemiBold from "../components/SemiBold";
import Header2 from "../components/Header/Header2";
import env from "../constants/env";
import { AuthContext } from "../auth/context";
import { DotIndicator } from "react-native-indicators";

const notifikasi = ({ navigation }) => {
  const userID = useContext(AuthContext);

  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    const { signal } = abortCont;
    fetch(`${env.url}/api/notif?user_id=${userID.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (item) {
          setItem(data.notifikasi);
          setLoading(false);
        }
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

  console.log(item);
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Notifikasi</Header2>
      <View style={{ flex: 1 }}>
        {!loading && !err && item.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <SemiBold>Tidak Ada Notifikasi</SemiBold>
          </View>
        )}
        {loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        )}
        {loading && !err && !item.length === 0 ? null : (
          <View style={styles.list}>
            {item.map((i) => {
              if (i.destinasi === "chat") {
                return (
                  <TouchableOpacity
                    key={i.id}
                    onPress={() => navigation.navigate("ListScreen")}
                  >
                    <View
                      key={i.id}
                      style={{
                        flexDirection: "row",
                        margin: 12,
                        height: 50,
                      }}
                    >
                      <View style={{ marginLeft: 25 }}>
                        <SemiBold style={{ fontSize: 16 }}>
                          {i.subjudul}
                        </SemiBold>
                        <SemiBold>{i.pesan}</SemiBold>
                      </View>
                    </View>
                    <View
                      style={{ borderBottomWidth: 0.5, borderColor: "black" }}
                    ></View>
                  </TouchableOpacity>
                );
              } else if (i.destinasi === "penawaran") {
                return (
                  <TouchableOpacity
                    key={i.id}
                    onPress={() => navigation.navigate("Penawaran")}
                  >
                    <View
                      key={i.id}
                      style={{ flexDirection: "row", margin: 12, height: 50 }}
                    >
                      <View style={{ marginLeft: 25 }}>
                        <SemiBold style={{ fontSize: 16 }}>
                          {i.subjudul}
                        </SemiBold>
                        <SemiBold>{i.pesan}</SemiBold>
                      </View>
                    </View>
                    <View
                      style={{ borderBottomWidth: 0.5, borderColor: "black" }}
                    ></View>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  list: {
    marginTop: 40,
  },
});
export default notifikasi;
