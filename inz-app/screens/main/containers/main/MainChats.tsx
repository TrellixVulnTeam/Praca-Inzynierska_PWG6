import React, {useEffect} from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
// @ts-ignore 
import FontAwesome from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../../../../model/colors";
import { APIvars } from "../../../../networking/API";

import Chat from "../single_chat/Chat"
import firebase from "firebase";
import chatFunctions from '../../../../functions/chat_groups'
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

// @ts-ignore 
const MainChats = ({ navigation }) => {
  const [showChat, setShowChat] = React.useState({
    show: false,
    chat: ""
  })

  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  const czatGrups = chatFunctions(user, 'MainChats')

  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.main_color }}>
      <StatusBar backgroundColor={Colors.main_color} hidden={true} />
      <Animatable.View animation="fadeInUpBig" style={styles.container}>
        <StatusBar hidden />
        <View style={styles.custom_top_nav}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          ></View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.custom_top_nav_text}>GŁÓWNE CZATY</Text>
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
                color={Colors.secondary_color}
                size={23}
                style={styles.main_drawer_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content_container}>
          {!showChat.show ?
            <View style={{ width: "100%", flex: 1 }}>
              {/* @ts-ignore */}
              {czatGrups && czatGrups.map((name) => {
                return <TouchableOpacity key={name} onPress={() => {setShowChat({ show: true, chat: name})}}>
                  <View key={name} style={{width: "100%", height: 100, backgroundColor: Colors.secondary_color, borderWidth: 3, borderRadius: 10, justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: 30, fontWeight: "bold"}}>{name}</Text>
                  </View>
                </TouchableOpacity> 
              })}
            </View>
            :
            // @ts-ignore
            <Chat state={showChat} setState={setShowChat}/>
          }
        </View>
      </Animatable.View>
    </View>
  );
};
export default MainChats;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.main_color },
  custom_top_nav: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.main_color,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  custom_top_nav_text:{
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    color: Colors.secondary_color,
    fontWeight: 'bold',
  },
  main_drawer_icon: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  content_container: {
    flex: 11,
    backgroundColor: Colors.main_color,
    alignItems: "center",
  },
});
