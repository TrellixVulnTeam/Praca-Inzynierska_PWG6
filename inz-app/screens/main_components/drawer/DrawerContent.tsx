import React from "react";
import { View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../../../components/context";
import { styles } from "./DrawerContent_styles";
import { Colors } from "../../../model/colors";

import { getLoginData, storeLoginData } from "../../../asyncActions/login"
import { useEffect } from "react";
import { useState } from "react";

export function DrawerContent(props) {
  const { LogoutContext } = React.useContext(AuthContext);

  const [ loginData, setLoginData ] = useState({"imie":"", "nazwisko": "", "email": ""});

  const readData = async () => {
    setLoginData(await getLoginData())
  }

  useEffect(() => { 
    const id = setInterval(() => {
      readData()
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.main_color }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{loginData.imie} {loginData.nazwisko}</Title>
                <Caption style={styles.caption}>{loginData.email}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Strona Główna"
              inactiveTintColor={Colors.secondary_color}
              activeTintColor={Colors.main_color}
              labelStyle={{fontWeight: "bold"}}
              onPress={() => {
                props.navigation.navigate("MainChats");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="chat" color={color} size={size} />
              )}
              label="Strumień Czatów"
              inactiveTintColor={Colors.secondary_color}
              activeTintColor={Colors.main_color}
              labelStyle={{fontWeight: "bold"}}
              onPress={() => {
                props.navigation.navigate("Chats");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profil"
              inactiveTintColor={Colors.secondary_color}
              activeTintColor={Colors.main_color}
              labelStyle={{fontWeight: "bold"}}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-helper" color={color} size={size} />
              )}
              label="Ustawienia"
              inactiveTintColor={Colors.secondary_color}
              activeTintColor={Colors.main_color}
              labelStyle={{fontWeight: "bold"}}
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Wyloguj"
          inactiveTintColor={Colors.secondary_color}
          activeTintColor={Colors.main_color}
          onPress={() => {
            LogoutContext();
          }}
        />
      </Drawer.Section>
    </View>
  );
}
