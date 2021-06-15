import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StatusBar, Text } from "react-native";

import FontAwesome from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";

import { Colors } from "../../../../model/colors";
import { styles } from "./Profile_styles"

const ProfileScreen = ({ navigation }) => {

  const [ editUserData, setEditUserData ] = useState(false)
  const [data, setData] = React.useState({
    username: "",
    password: "",
    passwordConfirm: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    arePassSame: true,
  });

  const inputView = (placeHolder, isSecured) => {
    return <TextInput
            placeholder={placeHolder}
            placeholderTextColor={Colors.main_color}
            secureTextEntry={isSecured ? data.secureTextEntry ? true : false : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setData({...data, username: val})}
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
            <Text style={styles.settingsText}>PROFILE</Text>
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
          <View style={{ width: "100%", flex: 0.6 }}>
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", paddingVertical: 20 }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.main_color }}>User Information</Text>
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Name:</Text>
                {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputView('Name', false)}
                </View>
                :
                <Text style={styles.user_info_text}>test</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Lastname:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputView('Lastname', false)}
                </View>
                :
                <Text style={styles.user_info_text}>test</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Email Address:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputView('Email', false)}
                </View>
                :
                <Text style={styles.user_info_text}>test</Text>}
            </View>
            <View style={styles.user_info_container}>
              <Text style={styles.user_info_text}>Password:</Text>
              {editUserData ?
                <View style={{ flex: 1 }}>
                  {inputView('Password', true)}
                </View>
                :
                <Text style={styles.user_info_text}>*****</Text>}
            </View>
            {editUserData &&
              <View style={styles.user_info_container}>
                <Text style={styles.user_info_text}>Repeat Password:</Text>
                <View style={{ flex: 1 }}>
                  {inputView('Repeat Password', true)}
                </View>
              </View>
            }
          </View>
          <View style={{ width: "100%", flex: 0.4, alignItems: "center", justifyContent:"center" }}>
            {editUserData ?
            <View style={{ height: "15%", width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => {setEditUserData(false)}} style={{backgroundColor: Colors.main_color, width: "30%", height:"100%", borderRadius: 20, justifyContent:"center", alignItems: "center"}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setEditUserData(false)}} style={{backgroundColor: Colors.main_color, width: "30%", height:"100%", borderRadius: 20, justifyContent:"center", alignItems: "center"}}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>SAVE</Text>
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={() => {setEditUserData(true)}} style={{backgroundColor: Colors.main_color, width: "30%", height:"15%", borderRadius: 20, justifyContent:"center", alignItems: "center"}}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>EDIT</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
export default ProfileScreen;

