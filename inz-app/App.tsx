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

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAE_j_ab3X82potUIrI5rJULukp6yLcsa8",
    authDomain: "alikacja-inzynierska.firebaseapp.com",
    projectId: "alikacja-inzynierska",
    storageBucket: "alikacja-inzynierska.appspot.com",
    messagingSenderId: "358957411488",
    appId: "1:358957411488:web:efe3bfc52f303f39c82dc5",
    measurementId: "G-C6HVV7JCQP"
  })
}else {
  firebase.app(); 
}

const auth = firebase.auth();

const Stack = createStackNavigator();

function SignIn(email = "test@wp.pl", password = "123456") {
    auth.signInWithEmailAndPassword(email, password)
}

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userName: "",
    userToken: "",
  };

  const [user] = useAuthState(auth);
  const [theme, setTheme] = useState({theme: themes.light})
  const [language, setLanguage] = useState({language: languages.en})

  // @ts-ignore
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
      LoginContext: async (username = "", password = "") => {
        SignIn(username, password)
        AsyncStorage.setItem("userToken", "qqqqq");
        loginState.isLoading = false;
        dispach({ type: "LOGIN", id: username, token: "qqqqq" });
      },
      LogoutContext: async () => {
        auth.signOut()
        try {
          await AsyncStorage.setItem("userToken", "");
        } catch (e) {
          Alert.alert("ERROR!", "Delete token error.", [{ text: "Okay" }]);
        }
        dispach({ type: "LOGOUT" });
      },
      // @ts-ignore
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
      // @ts-ignore
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
    // @ts-ignore
    setTheme(state => ({ theme: state.theme === themes.dark ? themes.light : themes.dark }));
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
