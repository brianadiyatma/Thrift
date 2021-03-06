import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import SemiBold from "../components/SemiBold";
import Price from "../components/Price";
import COLOR from "../constants/COLOR";
import Medium from "../components/Medium";
import TouchablePrimary from "../components/TouchablePrimary";
import asset from "../components/asset";
import env from "../constants/env";
import { DotIndicator, PacmanIndicator } from "react-native-indicators";
import { AuthContext } from "../auth/context";
import Stars from "react-native-stars";

function format(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const productPage = ({ route, navigation }) => {
  const { itemId } = route.params;
  const user = useContext(AuthContext);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [wishlist, setWihslist] = useState(null);
  const [err, setErr] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [UserPembeli, setUserPembeli] = useState(false);
  const userID = useContext(AuthContext);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(`${env.url}/api/produk/${itemId}?user_id=${user.userToken}`, {
      signal: abortCont.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
        if (res.wishlist) {
          setWihslist(res.wishlist.id);
        } else {
          setWihslist(null);
        }
        if (res.produk.id_penjual == userID.userToken) {
          setUserPembeli(true);
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

  const onWishlist = () => {
    setLoading2(true);
    if (wishlist) {
      fetch(`${env.url}/api/wishlist/${wishlist}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Berhasil Dihapus") {
            setWihslist(null);
            setLoading2(false);
          } else {
            throw Error("Ada Kesalahan Sistem");
          }
        })
        .catch((err) => alert(err.message));
    } else {
      fetch(`${env.url}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json", //prettier-ignore
        },
        body: JSON.stringify({
          user_id: user.userToken,
          produk_id: data.produk.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Sukses") {
            setWihslist(data.data.id);
            setLoading2(false);
          } else {
            throw Error("Ada Kesalahan Sistem");
          }
        })
        .catch((err) => alert(err.message));
    }
  };
  const myCustomShare = async () => {
    try {
      await Share.share({
        message: `Beli barang ini ${data.produk.nama_produk} di aplikasi Thrift \ ${env.url}/produk/${data.produk.id}`,
        urls: asset.url,
      });
    } catch (error) {
      console.log("Error => ", error);
    }
  };

  const onPesan = () => {
    setLoading3(true);
    fetch(`${env.url}/api/chat/${data.produk.id}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json", //prettier-ignore
      },
      body: JSON.stringify({
        user_id: user.userToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading3(false);

        if (res.status === 200) {
          navigation.replace("Chat", {
            id: res.user_chat.id,
            nama:
              res.user_chat.penerima_id === user.userToken
                ? res.user_chat.user.name
                : res.user_chat.penerima.name,
          });
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <View style={{ flex: 1 }}>
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
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <ScrollView>
            <View style={styles.top}>
              <Image
                source={{
                  uri: `${data.produk.url}`,
                  width: "100%",
                  height: 400,
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", left: 30, top: 60 }}
                onPress={() => navigation.goBack()}
              >
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
            <View style={styles.title}>
              <View style={{ width: "70%" }}>
                <SemiBold style={{ fontSize: 17.5 }}>
                  {data.produk.nama_produk}
                </SemiBold>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: 100,
                }}
              >
                {loading2 ? (
                  <PacmanIndicator
                    color="#FF8D44"
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <TouchableOpacity
                    styles={{ marginRight: 5 }}
                    onPress={onWishlist}
                  >
                    {userID.userToken !== data.produk.id_penjual && (
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          resizeMode: "contain",
                        }}
                        source={
                          wishlist
                            ? require(`../assets/img/icon/heart-orange.png`)
                            : require(`../assets/img/icon/Heart.png`)
                        }
                      />
                    )}
                  </TouchableOpacity>
                )}
                {loading2 ? null : (
                  <TouchableOpacity onPress={myCustomShare}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        resizeMode: "contain",
                      }}
                      source={require("../assets/img/icon/Share.png")}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.description}>
              <View style={{ flexDirection: "row" }}>
                <Price>Rp</Price>
                <Price
                  style={{
                    fontSize: 15,
                    textDecorationLine: data.produk.promo
                      ? "line-through"
                      : "none",
                  }}
                >
                  {format(data.produk.harga)}
                </Price>
              </View>
              {data.produk.promo && (
                <Price
                  style={{
                    fontSize: 15,
                    color: COLOR.primary,
                  }}
                >
                  Rp{format(data.produk.promo)} (
                  {Math.round(
                    ((data.produk.harga - data.produk.promo) /
                      data.produk.harga) *
                      100
                  )}
                  %)
                </Price>
              )}
              <View style={{ marginTop: 10 }}>
                <Medium>{data.produk.deskripsi}</Medium>
              </View>
            </View>
            <View style={styles.profile}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.profileImage}>
                  <Image
                    source={{
                      uri: `${data.produk.user.url}`,
                      width: 72,
                      height: 72,
                    }}
                    style={styles.profileImage}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfilePenjual", {
                      penjualId: data.produk.user.id,
                    })
                  }
                >
                  <View style={{ marginLeft: 10 }}>
                    <SemiBold>{data.produk.user.name}</SemiBold>
                    <Medium style={{ marginTop: 5 }}>
                      @{data.produk.user.username}
                    </Medium>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Stars
                      display={
                        data.produk.user.review.length === 0
                          ? 0
                          : data.produk.user.review.reduce(
                              (a, b) => a + Number(b.rating),
                              0
                            ) / data.produk.user.review.length
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
                </TouchableOpacity>
              </View>
              {userID.userToken !== data.produk.id_penjual && (
                <View>
                  {loading3 ? (
                    <PacmanIndicator
                      color="#FF8D44"
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={onPesan}
                    >
                      <Image
                        style={{ width: 20, height: 20 }}
                        source={require("../assets/img/icon/Vector1.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
          {!UserPembeli && (
            <View style={styles.buttonContainer}>
              <TouchablePrimary
                style={{ width: 154, height: 35 }}
                onPress={() =>
                  navigation.navigate("BayarPesanan", {
                    id: data.produk.id,
                  })
                }
              >
                Beli
              </TouchablePrimary>
              <TouchablePrimary
                style={{ width: 154, height: 35 }}
                onPress={() =>
                  navigation.navigate("Tawar", {
                    id: data.produk.id,
                    userID: user.userToken,
                  })
                }
              >
                Tawar
              </TouchablePrimary>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    width: "100%",
    height: 400,
  },
  image: {
    width: "100%",
    height: 400,
  },
  title: {
    width: "100%",
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  description: {
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: 20,
  },
  profileImage: {
    borderRadius: 72 / 2,
    overflow: "hidden",
  },
  profile: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default productPage;
