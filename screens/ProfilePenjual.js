import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SemiBold from "../components/SemiBold";
import Stars from "react-native-stars";
import ProfileNavigation from "../navigation/ProfileNavigation";
import env from "../constants/env";
import { DotIndicator } from "react-native-indicators";

const ProfilePenjual = ({ navigation, route }) => {
  const params = route.params;
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/toko/${params.penjualId}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setProfile(res.toko);
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
      {err && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <SemiBold style={{ fontSize: 17.5 }}>{err}</SemiBold>
        </View>
      )}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      ) : (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={require("../assets/img/icon/Arah.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <View>
              <Image
                style={styles.profileImage}
                source={{
                  uri: `${profile.url}`,
                  width: 85,
                  height: 85,
                }}
              />
            </View>
            <View>
              <SemiBold style={{ fontSize: 15 }}>{profile.name}</SemiBold>
              <SemiBold style={{ fontSize: 12 }}>@{profile.username}</SemiBold>
              <View style={{ marginTop: 20 }}>
                <Stars
                  display={
                    profile.review.length === 0
                      ? 0
                      : profile.review.reduce(
                          (a, b) => a + Number(b.rating),
                          0
                        ) / profile.review.length
                  }
                  disabled={true}
                  spacing={2}
                  count={5}
                  starSize={16}
                  fullStar={require("../assets/img/icon/star/fill.png")}
                  halfStar={require("../assets/img/icon/star/half.png")}
                  emptyStar={require("../assets/img/icon/star/border.png")}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: 50 }}></View>
        </View>
      )}
      {!loading && profile && <ProfileNavigation data={profile} />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginTop: 60,
    marginLeft: 15,
  },
  profile: {
    backgroundColor: "#FFFFFF",
    marginTop: 40,
    borderRadius: 18,
    width: 350,
    height: 140,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    elevation: 3,
  },
  profileImage: {
    borderRadius: 85 / 2,
    overflow: "hidden",
  },
});

export default ProfilePenjual;
