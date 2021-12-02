import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Picker,
  ScrollView,
} from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import BANK from "../../constants/BANK";
import { DotIndicator } from "react-native-indicators";
import TouchablePrimary from "../../components/TouchablePrimary";

const FormKonfirmasi = ({ navigation, route }) => {
  const [bank, setBank] = useState(null);
  const [namaRekening, setNamaRekening] = useState(null);
  const [nomorRekening, setNomorRekening] = useState(null);
  const [provinsi, setProvinsi] = useState(null);
  const [kota, setKota] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const [detail, setDetail] = useState(null);
  const [nomor, setNomor] = useState(null);

  const [provinsiList, setProvinsiList] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lengkap, setLengkap] = useState(null);
  const [KotaList, setKotaList] = useState(null);

  const params = route.params;

  useEffect(() => {
    const abortCont = new AbortController();
    fetch("https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json", {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Kesalahan Jaringan");
        }
        return res.json();
      })
      .then((data) => {
        setProvinsiList(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.message);
      });
    return () => abortCont.abort();
  }, []);

  const fetchKota = (id) => {
    fetch(
      `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${id}.json`
    )
      .then((res) => res.json())
      .then((data) => setKotaList(data));
  };

  const handleProvinsiChange = (itemValue) => {
    setProvinsi(itemValue);
    if (itemValue === null) {
      setKotaList(null);
    } else {
      setKota(null);
      fetchKota(itemValue.id);
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      {loading && (
        <View
          style={{
            marginTop: 50,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "auto",
          }}
        >
          <DotIndicator color="#FF8D44" />
        </View>
      )}
      {err && (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SemiBold>{err}</SemiBold>
        </View>
      )}
      {provinsiList && (
        <View>
          <Header2 onPress={() => navigation.goBack()}>Pembayaran</Header2>

          <View style={styles.bank}>
            <View>
              <SemiBold style={{ fontSize: 15 }}>Bank</SemiBold>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={bank}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setBank(itemValue);
                  }}
                  mode="dropdown"
                >
                  <Picker.Item label="Pilih Bank" value={null} />
                  {BANK.map((data) => {
                    return (
                      <Picker.Item
                        key={data.code}
                        label={data.name}
                        value={data.name}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <View style={styles.nomorRekening}>
            <TextInput
              style={styles.input}
              placeholder="Nama Rekening"
              onChangeText={(text) => setNamaRekening(text)}
              value={namaRekening}
            />
          </View>
          <View style={styles.nomorRekening}>
            <TextInput
              style={styles.input}
              placeholder="Nomor Rekening"
              onChangeText={(text) => setNomorRekening(text)}
              value={nomorRekening}
            />
          </View>
          <View style={styles.provinsi}>
            <SemiBold style={{ fontSize: 15 }}>Pilih Provinsi</SemiBold>
            <View style={{ ...styles.pickerContainer, marginTop: 10 }}>
              <Picker
                selectedValue={provinsi}
                style={styles.picker}
                onValueChange={handleProvinsiChange}
                mode="dropdown"
              >
                <Picker.Item label="Pilih Provinsi" value={null} />
                {provinsiList.map((data) => {
                  return (
                    <Picker.Item key={data.id} label={data.name} value={data} />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.kota}>
            <SemiBold style={{ fontSize: 15 }}>Pilih Kota</SemiBold>
            <View style={{ ...styles.pickerContainer, marginTop: 10 }}>
              <Picker
                selectedValue={kota}
                style={styles.picker}
                onValueChange={(itemValue) => setKota(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="Pilih Kota" value={null} />
                {KotaList &&
                  KotaList.map((data) => {
                    return (
                      <Picker.Item
                        key={data.id}
                        label={data.name}
                        value={data}
                      />
                    );
                  })}
              </Picker>
            </View>
          </View>
          <View style={styles.alamat}>
            <TextInput
              style={styles.input}
              placeholder="Alamat Lengkap"
              onChangeText={(text) => setAlamat(text)}
              value={alamat}
            />
          </View>
          <View style={styles.alamat}>
            <TextInput
              style={styles.input}
              placeholder="Detail Alamat"
              onChangeText={(text) => setDetail(text)}
              value={detail}
            />
          </View>
          <View style={styles.alamat}>
            <TextInput
              style={styles.input}
              placeholder="Nomor Telpon"
              onChangeText={(text) => setNomor(text)}
              value={nomor}
            />
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <TouchablePrimary
              style={styles.konfirmasi}
              onPress={() => {
                if (
                  bank &&
                  namaRekening &&
                  nomorRekening &&
                  provinsi &&
                  kota &&
                  alamat &&
                  detail &&
                  nomor
                ) {
                  navigation.navigate("KonfirmasiPesanan", {
                    ...params,
                    bank,
                    namaRekening,
                    nomorRekening,
                    provinsi,
                    kota,
                    alamat,
                    detail,
                    nomor,
                  });
                } else {
                  setLengkap("Lengkapi Data Anda");
                }
              }}
            >
              Konfirmasi
            </TouchablePrimary>
            <SemiBold style={{ color: "#BA0000" }}>{lengkap}</SemiBold>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bank: {
    marginTop: 35,
    marginLeft: 20,
    marginRight: 20,
  },
  pickerContainer: {
    width: "100%",
    height: 48,
    borderRadius: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1.0)",
    fontFamily: "LGC",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E1E1E1",
    padding: 5,
    height: 40,
  },
  nomorRekening: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  provinsi: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  kota: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  alamat: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  konfirmasi: {
    width: 150,
    height: 40,
  },
});
export default FormKonfirmasi;
