import React, { useContext, useState } from "react";
import { View } from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import TouchablePrimary from "../../components/TouchablePrimary";
import { AuthContext } from "../../auth/context";
import env from "../../constants/env";
import { DotIndicator } from "react-native-indicators";

const Panduan = ({ navigation, route }) => {
  const user = useContext(AuthContext);
  const params = route.params;
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(params.total);
  const handleSetuju = () => {
    setLoading(true);
    fetch(`${env.url}/api/checkout/${params.idProduct}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.userToken,
        total: params.total,
        metode_bayar: params.metode_bayar,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);

        if (params.metode_bayar === "transfer") {
          navigation.navigate("Transfer", { ...params, id: res.pemesanan.id });
        } else if (params.metode_bayar === "qris") {
          navigation.navigate("QRIS", { ...params, id: res.pemesanan.id });
        } else {
          navigation.popToTop();
        }
      })
      .catch((err) => {
        setErr(err.message);
        setLoading(false);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Header2 onPress={() => navigation.goBack()}>Panduan</Header2>
      <View style={{ marginTop: 40 }}>
        <View style={{ flexDirection: "row", width: 360 }}>
          <SemiBold style={{ marginRight: 15 }}>1.</SemiBold>
          <SemiBold>
            Sebelum membayar, pastikan anda meminta konfirmasi terlebih dahulu
            ke penjual mengenai produk yang dibeli dengan menghubungi langsung
            ke penjual.
          </SemiBold>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, width: 360 }}>
          <SemiBold style={{ marginRight: 15 }}>2.</SemiBold>
          <SemiBold>
            Pihak pemilik aplikasi tidak akan bertanggung jawab apabila produk
            yang dibeli oleh pembeli tidak sesuai.
          </SemiBold>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10, width: 360 }}>
          <SemiBold style={{ marginRight: 15 }}>3.</SemiBold>
          <SemiBold>
            Pembayaran dengan sistem COD dilakukan secara langsung antara pihak
            pembeli dan penjual.
          </SemiBold>
        </View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <DotIndicator color="#FF8D44" />
          </View>
        ) : (
          <View style={{ width: "100%", alignItems: "center", marginTop: 40 }}>
            <TouchablePrimary
              onPress={handleSetuju}
              style={{ width: 190, height: 35, marginTop: 20 }}
            >
              Saya Menyetujui
            </TouchablePrimary>
            <TouchablePrimary
              onPress={() => navigation.popToTop()}
              style={{
                width: 190,
                height: 35,
                backgroundColor: "#BA0000",
                marginTop: 20,
              }}
            >
              Saya tidak menyetujui
            </TouchablePrimary>
          </View>
        )}
      </View>
      {err && (
        <SemiBold style={{ marginTop: 50, textAlign: "center" }}>
          {err}
        </SemiBold>
      )}
    </View>
  );
};

export default Panduan;
