import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SemiBold from "../components/SemiBold";
import Stars from "react-native-stars";
import ProfileNavigation from "../navigation/ProfileNavigation";

const ProfilePenjual = ({ navigation }) => {
  const [Profile, setProfile] = useState({
    nama: "Adolf Hitler",
    namaPengguna: "@AdolfHitler",
    star: 5,
  });
  return (
    <View style={styles.screen}>
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
            source={require("../assets/img/imageProfile/adolf.jpg")}
          />
        </View>
        <View>
          <SemiBold style={{ fontSize: 15 }}>{Profile.nama}</SemiBold>
          <SemiBold style={{ fontSize: 12 }}>{Profile.namaPengguna}</SemiBold>
          <View style={{ marginTop: 20 }}>
            <Stars
              display={Profile.star}
              spacing={2}
              count={5}
              starSize={16}
              fullStar={require("../assets/img/icon/star/fill.png")}
              emptyStar={require("../assets/img/icon/star/border.png")}
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 50 }}></View>
      <ProfileNavigation id={12} />
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
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    overflow: "hidden",
  },
});

export default ProfilePenjual;
