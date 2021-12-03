import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { DotIndicator } from "react-native-indicators";
import { AuthContext } from "../../auth/context";
import Header2 from "../../components/Header/Header2";
import Input from "../../components/Input";
import env from "../../constants/env";

const Chat = ({ navigation, route }) => {
  const [ketik, setKetik] = useState(null);
  const params = route.params;
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const user = useContext(AuthContext);
  const scrollViewRef = useRef();
  const [height, setHeight] = useState("79%");
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setHeight("60%");
      scrollViewRef.current.scrollToEnd({ animated: true });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setHeight("79%");
      scrollViewRef.current.scrollToEnd({ animated: true });
    });
    if (firstTime) {
      setFirstTime(false);
    }
    const abortCont = new AbortController();
    const { signal } = abortCont;
    const fetchData = setInterval(() => {
      fetch(`${env.url}/api/chat/${params.id}/messages`, {
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
      showSubscription.remove();
      hideSubscription.remove();
      abortCont.abort();
    };
  }, []);
  console.log(ketik);
  const onSend = () => {
    setKetik("");
    fetch(`${env.url}/api/chat/${params.id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 9,
        pesan: ketik,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log("Sukses kirim");
      });
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Header2 onPress={() => navigation.replace("ListScreen")}>
        {params.nama}
      </Header2>
      <View style={styles.list}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{ height: height, marginBottom: 30 }}
        >
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
              {item.messages.map((i) => (
                <View
                  key={i.id}
                  style={
                    i.user_id == user.userToken
                      ? styles.pengirim
                      : styles.penerima
                  }
                >
                  <Text style={styles.pesan}>{i.pesan}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
      {loading ? null : (
        <View
          style={{
            marginTop: "auto",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingBottom: 20,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Input
            style={{ width: 300, height: 41, marginRight: 20 }}
            placeholder="Ketik disini"
            onChangeText={(e) => setKetik(e)}
            value={ketik}
          />
          <TouchableOpacity onPress={onSend}>
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
      )}
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
