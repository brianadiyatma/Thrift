import React, { useState, useEffect } from "react";

import StackNavigation from "../navigation/StackNavigation";

import { NavigationContainer } from "@react-navigation/native";

import AuthNavigation from "../navigation/AuthNavigation";

import { DotIndicator } from "react-native-indicators";
import { View } from "react-native";
import { AuthContext } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../constants/env";

const initialLoginState = {
  isLoading: true,
  userToken: null,
};

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case "RETRIEVE_TOKEN":
      return { userToken: action.token, isLoading: false };
    case "LOGIN":
      return { userToken: action.token, isLoading: false };
    case "LOGOUT":
      return { userToken: null, isLoading: false };
    case "REGISTER":
      return { userToken: action.token, isLoading: false };
  }
};

const Auth = () => {
  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const [error, setError] = useState({
    errLogin: "",
    errDaftar: "",
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async (username, password) => {
        fetch(`${env.url}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.id) {
              AsyncStorage.setItem("userToken", String(res.id));
              dispatch({ type: "LOGIN", userToken: res.id });
            } else if (res.message) {
              setTimeout(
                () =>
                  setError({
                    errLogin: "",
                    errDaftar: "",
                  }),
                5000
              );
              setError({
                errLogin: res.message,
                errDaftar: "",
              });
            } else if (res.data) {
              setError({
                errLogin: res.data.password
                  ? res.data.password
                  : res.data.username,
                errDaftar: "",
              });
            }
          })
          .catch((err) => {
            setError({ errLogin: "Kesalahan Jaringan", errDaftar: "" });
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: (nama, tel, email, password, username) => {
        fetch(`${env.url}/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept":"application/json", //prettier-ignore
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: nama,
            username: username,
            tel: tel,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.data.id) {
              AsyncStorage.setItem("userToken", String(res.data.id));
              console.log(res.data.id);
              dispatch({ type: "REGISTER", userToken: res.data.id });
            } else if (res.messages === "Gagal") {
              const data = Object.values(res.data);
              setTimeout(
                () =>
                  setError({
                    errLogin: "",
                    errDaftar: "",
                  }),
                5000
              );
              setError({ errLogin: "", errDaftar: data[0][0] });
            }
          })
          .catch((err) => setError({ errLogin: "", errDaftar: err.message }));
      },
    }),
    []
  );

  useEffect(() => {
    const retrieveToken = async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "REGISTER", token: userToken });
    };
    retrieveToken();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <DotIndicator color="#FF8D44" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authContext: authContext,
        userToken: loginState.userToken,
        error: error,
      }}
    >
      <NavigationContainer>
        {loginState.userToken === null ? (
          <AuthNavigation />
        ) : (
          <StackNavigation />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Auth;
