import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, StatusBar, Text, KeyboardAvoidingView } from "react-native";

// @ts-ignore
import FontAwesome from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";

import { getLoginData, storeLoginData } from "../../../../asyncActions/login"

import { Colors } from "../../../../model/colors";
import { styles } from "./Profile_styles"

// @ts-ignore
const ProfileScreen = ({ navigation }) => {

  const [ editUserData, setEditUserData ] = useState(false)
  
  const [data, setData] = React.useState({
    userData:{
      imie: "",
      nazwisko: "",
      email: "",
      dane1: "",
      dane2: "",
      dane3: "",
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

  // @ts-ignore
  const inputView = (placeHolder, isSecured, name) => {
    return <View style={styles.textInputContainer}>
            <TextInput
              placeholder={placeHolder}
              placeholderTextColor={Colors.main_color}
              secureTextEntry={isSecured ? data.secureTextEntry ? true : false : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setData({...data, [name]: val})}
            />
          </View>
  }

  // @ts-ignore
  const inputViewUserData = (placeHolder, isSecured, name) => {
    return <View style={styles.textInputContainer}>
            <TextInput
              placeholder={placeHolder}
              placeholderTextColor={Colors.main_color}
              secureTextEntry={isSecured ? data.secureTextEntry ? true : false : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setData({...data, userData: { ...data.userData, [name]: val}})}
            />
          </View> 
  }
 
  return (
    <KeyboardAvoidingView
    // @ts-ignore
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-1000}
      style={{flex: 1}}
    >
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
            <View style={{ width: "100%", height: '30%', paddingTop: 10}}>
              <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.main_color }}>Dane użytkownika</Text>
              </View>
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Imie:</Text>
                  {editUserData ?
                  <View style={{ flex: 1 }}>
                    {inputViewUserData('Imie', false, "imie")}
                  </View>
                  :
                  <Text style={styles.user_info_text}>{data.userData.imie}</Text>}
              </View>
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Nazwisko:</Text>
                {editUserData ?
                  <View style={{ flex: 1 }}>
                    {inputViewUserData('Nazwisko', false, "nazwisko")}
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
                    {inputView('Haslo', true, "password")}
                  </View>
                  :
                  <Text style={styles.user_info_text}>*****</Text>}
              </View>
              {editUserData &&
                <View style={styles.user_info_container}>
                  <Text style={styles.user_info_text}>Powtórz hasło:</Text>
                  <View style={{ flex: 1 }}>
                    {inputView('Powtórz hasło', true, "passwordConfirm")}
                  </View>
                </View>
              }
            </View>
            <View style={{ width: "100%", height: "25%"}}>
              <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.main_color }}>Preferencje użytkownika</Text>
              </View>
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Dane1:</Text>
                  {editUserData ?
                  <View style={{ flex: 1 }}>
                    {inputViewUserData('Dane1', false, "Dane1")}
                  </View>
                  :
                  <Text style={styles.user_info_text}>{data.userData.dane1}</Text>}
              </View>
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Dane2:</Text>
                {editUserData ?
                  <View style={{ flex: 1 }}>
                    {inputViewUserData('Dane2', false, "Dane2")}
                  </View>
                  :
                  <Text style={styles.user_info_text}>{data.userData.dane2}</Text>}
              </View>
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Dane3:</Text>
                {editUserData ?
                  <View style={{ flex: 1 }}>
                    {inputViewUserData('Dane3', false, "Dane3")}
                  </View>
                  :
                  <Text style={styles.user_info_text}>{data.userData.dane3}</Text>}
              </View>
              </View>
            <View style={{ width: "100%", flex: 0.4, alignItems: "center", justifyContent:"flex-start" }}>
              {editUserData ?
              <View style={{ height: "35%", width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <TouchableOpacity onPress={() => {setEditUserData(false)}} style={{backgroundColor: Colors.main_color, width: "45%", height:"100%", borderRadius: 10, justifyContent:"center", alignItems: "center"}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 30 }}>ANULUJ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setEditUserData(false), saveLoginData()}} style={{backgroundColor: Colors.main_color, width: "45%", height:"100%", borderRadius: 10, justifyContent:"center", alignItems: "center"}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 30 }}>ZAPISZ</Text>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity onPress={() => {setEditUserData(true)}} style={{backgroundColor: Colors.main_color, width: "50%", height:"25%", borderRadius: 10, justifyContent:"center", alignItems: "center"}}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>EDYCJA</Text>
              </TouchableOpacity>
              }
            </View>
          </View>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default ProfileScreen;

