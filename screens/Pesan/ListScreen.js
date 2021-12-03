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
  const [firstTime, setFirstTime] = useState(true);
  const user = useContext(AuthContext);
  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
    }
    const abortCont = new AbortController();
    const { signal } = abortCont;
    const fetchData = setInterval(() => {
      fetch(`${env.url}/api/chat/${user.userToken}`, {
        signal: signal,
      })
        .then((res) => res.json())
        .then((res) => {
          setItem(res);
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
    }, 5000);
    return () => {
      clearInterval(fetchData);
      abortCont.abort();

    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Pesan</Header2>
      <View style={{ flex: 1 }}>
        <View style={styles.list}>
          {loading ? (
            <View
              style={{
                marginTop: 50,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DotIndicator color="#FF8D44" />
            </View>
          ) : (
            <View>
              {item.userChat.map((i, j) => (
                <TouchableOpacity
                  key={i.id}
                  onPress={() =>
                    navigation.replace("Chat", {
                      id: i.id,
                      nama:
                        i.penerima_id === user.userToken
                          ? i.user.name
                          : i.penerima.name,
                    })
                  }
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
                        {i.penerima_id === user.userToken
                          ? i.user.name
                          : i.penerima.name}
                      </SemiBold>
                      <SemiBold style={{ fontSize: 12, marginTop: 10 }}>
                        {item.message[j].pesan}
                      </SemiBold>
                    </View>
                  </View>
                  <View
                    style={{ borderBottomWidth: 1, borderColor: "black" }}
                  ></View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
