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

import FontAwesome from "react-native-vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../../../../model/colors";
import { APIvars } from "../../../../networking/API";

import Chat from "../single_chat/Chat"


const ChatsScreen = ({ navigation }) => {
  const [addTask, setAddTask] = React.useState(false);

  const chatsList = [
    {
        key: '1',
        title: 'test',
        description: 'testDes'
    },
    {
        key: '2',
        title: 'test2',
        description: 'testDes2'
    }
]
  
  return (
    <View style={{ flex: 1, backgroundColor: Colors.main_color }}>
      <StatusBar backgroundColor={Colors.main_color} hidden={true} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={addTask}
        onRequestClose={() => {
          setAddTask(!addTask)
        }}
      >
      </Modal>
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
            <Text style={styles.custom_top_nav_text}>LOSOWE CZATY</Text>
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
          <View style={{ width: "100%", flex: 1 }}>
            {chatsList.map(({key,title, description}) => {
              return <View key={key}>
                <Chat params={{title: title, description: description}}/></View>
            })}
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};
export default ChatsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary_color },
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
    backgroundColor: Colors.secondary_color,
    alignItems: "center",
  },
  fab_button_text: {
    fontSize: 45, 
    color: Colors.secondary_color
  },
  fab_button: {
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: Colors.main_color, 
    borderRadius: 30, 
    paddingBottom: 4,
    elevation: 8 
  }
});
