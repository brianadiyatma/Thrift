import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Header2 from "../../components/Header/Header2";
import SemiBold from "../../components/SemiBold";
import TouchablePrimary from "../../components/TouchablePrimary";
import { DotIndicator } from "react-native-indicators";

const Filter = ({ navigation, route }) => {
  const [kategori, setKategori] = useState(null);
  const [urutkan, setUrutkan] = useState(null);
  const [provinsi, setProvinsi] = useState(null);
  const [minimal, setMinimal] = useState(null);
  const [maximal, setMaximal] = useState(null);

  const [provinsiList, setProvinsiList] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = route.params;

  const onSubmit = () => {
    navigation.push("SearchResult", {
      kategori: kategori,
      min: minimal,
      max: maximal,
      Search: params.Search,
      daerah: provinsi,
      urutkan: urutkan,
    });
  };

  useEffect(() => {
    const abortCont = new AbortController();

    fetch("https://dev.farizdotid.com/api/daerahindonesia/provinsi", {
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Kesalahan Jaringan");
        }
        return res.json();
      })
      .then((data) => {
        setProvinsiList(data.provinsi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.message);
      });
    return () => abortCont.abort();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
      {err && (
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SemiBold style={{ color: "red" }}>{err}</SemiBold>
        </View>
      )}
      {provinsiList && (
        <ScrollView>
          <Header2 onPress={() => navigation.goBack()}>Filter</Header2>
          <View style={{ marginTop: 25, marginLeft: 20, marginRight: 10 }}>
            <View>
              <SemiBold style={{ fontSize: 15 }}>Kategori</SemiBold>
              <View style={{ ...styles.pickerContainer, marginTop: 10 }}>
                <Picker
                  selectedValue={kategori}
                  style={styles.picker}
                  onValueChange={(itemValue) => setKategori(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="Pilih Kategori" value={null} />
                  <Picker.Item label="Sepatu" value="Sepatu" />
                  <Picker.Item label="Tas" value="Tas" />
                  <Picker.Item label="Jam Tangan" value="JamTangan" />
                  <Picker.Item label="Baju" value="Baju" />
                  <Picker.Item label="Handphone" value="Handphone" />
                  <Picker.Item label="Game Console" value="Game Console" />
                  <Picker.Item label="Lainya" value="Lainya" />
                </Picker>
              </View>
              <View style={{ ...styles.pickerContainer, marginTop: 20 }}>
                <Picker
                  selectedValue={urutkan}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setUrutkan(itemValue);
                  }}
                  mode="dropdown"
                >
                  <Picker.Item label="Urutkan" value={null} />
                  <Picker.Item label="Terpopuler" value="Terpopuler" />
                  <Picker.Item label="Terbaru" value="Terbaru" />
                </Picker>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <SemiBold style={{ fontSize: 15 }}>Pilih Provinsi</SemiBold>
              <View style={{ ...styles.pickerContainer, marginTop: 10 }}>
                <Picker
                  selectedValue={provinsi}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setProvinsi(itemValue);
                  }}
                  mode="dropdown"
                >
                  <Picker.Item label="Pilih Provinsi" value={null} />
                  {provinsiList.map((data) => {
                    return (
                      <Picker.Item
                        key={data.id}
                        label={data.nama}
                        value={data.nama}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <SemiBold style={{ fontSize: 15 }}>Harga</SemiBold>
              <TextInput
                placeholder="Minimal"
                value={minimal}
                onChangeText={(text) => {
                  setMinimal(text);
                }}
                style={{
                  ...styles.pickerContainer,
                  paddingLeft: 20,
                  marginTop: 20,
                }}
              />
              <TextInput
                placeholder="Maksimal"
                onChangeText={(text) => {
                  setMaximal(text);
                }}
                value={maximal}
                style={{
                  ...styles.pickerContainer,
                  paddingLeft: 20,
                  marginTop: 20,
                }}
              />
            </View>
          </View>
          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            <TouchablePrimary
              style={{ width: 150, height: 30 }}
              onPress={onSubmit}
            >
              Pilih
            </TouchablePrimary>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pickerContainer: {
    width: "100%",
    height: 48,
    borderRadius: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1.0)",
  },
  picker: {
    width: "100%",
    height: 48,
    borderRadius: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "rgba(225, 225, 225, 1.0)",
    fontFamily: "LGC",
  },
});

export default Filter;
