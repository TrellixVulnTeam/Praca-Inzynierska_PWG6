import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, StatusBar, Text } from "react-native";

import FontAwesome from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";

import { getLoginData, storeLoginData } from "../../../../asyncActions/login"

import { Colors } from "../../../../model/colors";
import { styles } from "./Profile_styles"

const ProfileScreen = ({ navigation }) => {

  const [ editUserData, setEditUserData ] = useState(false)
  const [ loginData, setLoginData ] = useState({"imie":"", "nazwisko": "", "email": ""});
  
  const [data, setData] = React.useState({
    userData:{
      imie: "",
      nazwisko: "",
      email: ""
    },
    username: "",
    password: "",
    passwordConfirm: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    arePassSame: true,
  });

  const saveLoginData = async () => {
    storeLoginData({
      "imie": data.userData.imie,
      "nazwisko": data.userData.nazwisko,
      "email": data.userData.email
    })
  }

  const readData = async () => {
    setData({...data, userData: await getLoginData() })
  }

  useEffect(() => {
    readData()
  }, [])

  const inputView = (placeHolder, isSecured, name) => {
    return <TextInput
            placeholder={placeHolder}
            placeholderTextColor={Colors.main_color}
            secureTextEntry={isSecured ? data.secureTextEntry ? true : false : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setData({...data, [name]: val})}
          />
  }

  const inputViewUserData = (placeHolder, isSecured, name) => {
    return <TextInput
            placeholder={placeHolder}
            placeholderTextColor={Colors.main_color}
            secureTextEntry={isSecured ? data.secureTextEntry ? true : false : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setData({...data, userData: { ...data.userData, [name]: val}})}
          />
  }
 
  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary_color }}>
      <Animatable.View animation="fadeInUpBig" style={styles.container}>
        <StatusBar hidden />
        <View style={styles.custom_top_nav}>
          <View
            style={{
              flex: 1,
            }}
          />
          <View style={styles.settingsTextBar}>
            <Text style={styles.settingsText}>PROFIL</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
            >
              <FontAwesome
                name="menu-unfold"
                color={Colors.main_color}
                size={23}
                style={styles.main_drawer_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 1, alignItems: "center"}}>
          <View style={{ flex:1, width: "60%", backgroundColor: Colors.main_color }}/>
        </View>
        <View style={styles.content_container}>
          <View style={{ width: "100%", flex: 0.3 , paddingTop: 10}}>
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.main_color }}>Dane użytkownika</Text>
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Imie:</Text>
                {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputViewUserData('Name', false, "imie")}
                </View>
                :
                <Text style={styles.user_info_text}>{data.userData.imie}</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Nazwisko:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputViewUserData('Lastname', false, "nazwisko")}
                </View>
                :
                <Text style={styles.user_info_text}>{data.userData.nazwisko}</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Email:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputViewUserData('Email', false, "email")}
                </View>
                :
                <Text style={styles.user_info_text}>{data.userData.email}</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Haslo:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputView('Password', true, "password")}
                </View>
                :
                <Text style={styles.user_info_text}>*****</Text>}
            </View>
            {editUserData &&
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Powtórz hasło:</Text>
                <View style={{ flex: 1 }}>
                  {inputView('Repeat Password', true, "passwordConfirm")}
                </View>
              </View>
            }
          </View>
          <View style={{ width: "100%", flex: 0.3 }}>
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.main_color }}>Preferencje użytkownika</Text>
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Lista Zainteresowań:</Text>
                {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputViewUserData('Name', false, "imie")}
                </View>
                :
                <Text style={styles.user_info_text}>{data.userData.imie}</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Otwartość na relacje:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputViewUserData('Lastname', false, "nazwisko")}
                </View>
                :
                <Text style={styles.user_info_text}>{data.userData.nazwisko}</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Płeć:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputViewUserData('Email', false, "email")}
                </View>
                :
                <Text style={styles.user_info_text}>{data.userData.email}</Text>}
            </View>
            </View>
          <View style={{ width: "100%", flex: 0.4, alignItems: "center", justifyContent:"center" }}>
            {editUserData ?
            <View style={{ height: "15%", width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => {setEditUserData(false)}} style={{backgroundColor: Colors.main_color, width: "30%", height:"100%", borderRadius: 20, justifyContent:"center", alignItems: "center"}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ANULUJ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setEditUserData(false), saveLoginData()}} style={{backgroundColor: Colors.main_color, width: "30%", height:"100%", borderRadius: 20, justifyContent:"center", alignItems: "center"}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>ZAPISZ</Text>
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => {setEditUserData(true)}} style={{backgroundColor: Colors.main_color, width: "30%", height:"15%", borderRadius: 20, justifyContent:"center", alignItems: "center"}}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>EDYCJA</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
export default ProfileScreen;

