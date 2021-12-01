import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ProductPage from "../screens/ProductPage";
import Notifikasi from "../screens/Notifikasi";
import ProfilePenjual from "../screens/ProfilePenjual";
import Riwayat from "../screens/Akun/Riwayat";
import Kategori from "../screens/Kategori/Kategori";
import SearchResult from "../screens/Search/SearchResult";
import Filter from "../screens/Search/Filter";
import Tawar from "../screens/Penawaran/Tawar";
import BayarPesanan from "../screens/Pembayaran/BayarPesanan";
import Pemesanan from "../screens/Akun/History/Pemesanan";
import UbahData from "../screens/Akun/UbahData";
import Transfer from "../screens/Pembayaran/metode/Transfer";
import QRIS from "../screens/Pembayaran/metode/QRIS";
import FormKonfirmasi from "../screens/Pembayaran/FormKonfirmasi";
import Penawaran from "../screens/Akun/History/Penawaran";
import ListScreen from "../screens/Pesan/ListScreen";
import Chat from "../screens/Pesan/Chat";
import Bantuan from "../screens/Akun/Bantuan";

const Stack = createNativeStackNavigator();
const stackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="tabNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
      <Stack.Screen name="ProfilePenjual" component={ProfilePenjual} />
      <Stack.Screen name="Riwayat" component={Riwayat} />
      <Stack.Screen name="Kategori" component={Kategori} />
      <Stack.Screen name="SearchResult" component={SearchResult} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Tawar" component={Tawar} />
      <Stack.Screen name="BayarPesanan" component={BayarPesanan} />
      <Stack.Screen name="Pemesanan" component={Pemesanan} />
      <Stack.Screen name="Penawaran" component={Penawaran} />
      <Stack.Screen name="UbahData" component={UbahData} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="QRIS" component={QRIS} />
      <Stack.Screen name="FormKonfirmasi" component={FormKonfirmasi} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Bantuan" component={Bantuan} />
    </Stack.Navigator>
  );
};

export default stackNavigation;
