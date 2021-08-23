import "react-native-gesture-handler";
import React, { useEffect, useMemo, useState } from "react";

import { StyleSheet, SafeAreaView, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getLoginData, storeLoginData } from "./asyncActions/login"

import Login from "./screens/main_components/login/Login";
import Register from "./screens/main_components/register/Register";
import Main from "./screens/main/Main";

import { ThemeContext, themes } from "./model/themes"
import { LanguageContext, languages } from "./languages/translator"

import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "./components/context";
import { APIvars } from "./networking/API"

const Stack = createStackNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: "",
    userToken: "",
  };

  const [theme, setTheme] = useState({theme: themes.light})
  const [language, setLanguage] = useState({language: languages.en})

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: "",
          userName: "",
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispach] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = useMemo(
    () => ({
      LoginContext: async (username, password) => {
        AsyncStorage.setItem("userToken", "qqqqq");
        loginState.isLoading = false;
        dispach({ type: "LOGIN", id: username, token: "qqqqq" });
        // loginState.isLoading = true;
        // let usertoken = "";
        // fetch(APIvars.prefix + "://" + APIvars.ip + ":" + APIvars.port + "/Auth", {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     usr: username,
        //     pass: password
        //   })
        // })
        //   .then((response) => response.json())
        //   .then((responseJSON) => {
        //     if (responseJSON.Users.Token != "") {
        //       usertoken = responseJSON.Users.Token;

        //       try {
        //         AsyncStorage.setItem("userToken", responseJSON.Users.Token);
        //       } catch (e) {
        //         Alert.alert("ERROR!", "Set token error.", [{ text: "Okay" }]);
        //       }
        //     } else {
        //       Alert.alert("Invalid User!", "Username or password is incorrect.", [
        //         { text: "Okay" },
        //       ]);
        //     }
        //     console.log(responseJSON.Users.Token)
        //     loginState.isLoading = false;
        //     dispach({ type: "LOGIN", id: username, token: usertoken });
        //   }).catch(function (error) {
        //     console.log('There has been a problem with your fetch operation: ' + error.message);
        //     throw error;
        //   });
      },
      LogoutContext: async () => {
        try {
          await AsyncStorage.setItem("userToken", "");
        } catch (e) {
          Alert.alert("ERROR!", "Delete token error.", [{ text: "Okay" }]);
        }
        dispach({ type: "LOGOUT" });
      },
      GetUserInfoContext: async (userToken) => {
        let userName = "";
        let email = "";
        fetch(APIvars.prefix + "://" + APIvars.ip + ":" + APIvars.port + "/getUserInfo", {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userToken: userToken
          })
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON.Users.Token != "") {
            userName = responseJSON.Users.UserName;
            email = responseJSON.Users.Email;
            try {
              AsyncStorage.setItem("userName", responseJSON.Users.UserName);
              AsyncStorage.setItem("email", responseJSON.Users.Email);
            } catch (e) {
              Alert.alert("ERROR!", "Get user info error.", [{ text: "Okay" }]);
            }
          } else {
            Alert.alert("Invalid User!", "User does not exist.", [
              { text: "Okay" },
            ]);
          }
        })
      },
      RegisterContext: (username, password) => {
        let usertoken = "";
        if (username == "user" && password == "aaaaaaaa") {
          usertoken = "qqqq";
        }
        dispach({ type: "REGISTER", id: username, token: usertoken });
      },
    }),
    []
  );

  const toggleTheme = () => {
    setTheme(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };
  // @ts-ignore 
  const changeLanguage = (lang) => {
    setLanguage({
      // @ts-ignore
      language: languages[lang]
    });
  };

  const langState = {
    language: language,
    changeLanguage: changeLanguage
  }

  const state = {
    theme: theme.theme,
    toggleTheme: toggleTheme,
  };

  useEffect(() => {
    // TODO CONST
    storeLoginData({
        "imie": "Maciek",
        "nazwisko": "Chmielewski",
        "email": "maciej.jakub.chmielewski@gmail.com"
      })
  })

  useEffect(() => {
    const timer = setTimeout(async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        Alert.alert("ERROR!", "Get token error.", [{ text: "Okay" }]);
      }
      if (userToken == null) { userToken = ""; }
      dispach({ type: "RETRIVE_TOKEN", token: userToken });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loginState.isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  } else {
    return (
      
      <ThemeContext.Provider value={state}>
        <LanguageContext.Provider value={langState}>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              {loginState.userToken == "" ? (
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
              ) : (
                  <Main />
                )}
            </NavigationContainer>
          </AuthContext.Provider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
