import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header2 from "../../../components/Header/Header2";

import { DotIndicator } from "react-native-indicators";
import { AuthContext } from "../../../auth/context";
import env from "../../../constants/env";
import SemiBold from "../../../components/SemiBold";
import TawarList from "../../../components/TawarList";

const Penawaran = ({ navigation }) => {
  const user = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/penawaran?user_id=${user.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
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

  return (
    <View style={styles.screen}>
      <Header2 onPress={() => navigation.goBack()}>Penawaran</Header2>
      <View style={{ flex: 1 }}>
        {!loading && item.tawar.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <SemiBold>Tidak Ada Penawaran</SemiBold>
          </View>
        )}
        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        )}

        {!loading && (
          <ScrollView>
            {item.tawar.map((i) => {
              if (i.status === "Proses") {
                return (
                  <View style={{ marginTop: 45 }} key={i.id}>
                    <TawarList
                      imgurl={`${env.url}/assets/img/uploads/produk/${i.produk.foto}`}
                      status={i.status}
                      statusColor="black"
                      detail={false}
                    >
                      {i.produk.nama_produk}
                    </TawarList>
                  </View>
                );
              } else if (i.status === "Diterima") {
                return (
                  <View style={{ marginTop: 45 }} key={i.id}>
                    <TawarList
                      imgurl={`${env.url}/assets/img/uploads/produk/${i.produk.foto}`}
                      status={i.status}
                      statusColor="green"
                      detail={true}
                      onPress={() =>
                        navigation.navigate("BayarPesanan", { id: i.produk.id })
                      }
                    >
                      {i.produk.nama_produk}
                    </TawarList>
                  </View>
                );
              }
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Penawaran;
