import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Auth from "./auth/Auth";

const fetchFonts = () => {
  return Font.loadAsync({
    "Montserrat-Semi-Bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "LGC-Bold": require("./assets/fonts/LouisGeorgeCafeBold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "LGC": require("./assets/fonts/Louis-George-Cafe.ttf"), //prettier-ignore
  });
};



export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={() => console.log("FontsError")}
      />
    );
  }
  return <Auth />;
}
