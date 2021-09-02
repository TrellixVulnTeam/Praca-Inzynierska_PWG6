import React, {useContext} from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// @ts-ignore
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../../../components/context";
import { ThemeContext } from "../../../model/themes"
import { LanguageContext } from "../../../languages/translator"

import { getLoginData } from "../../../asyncActions/login"
import { useEffect } from "react";
import { useState } from "react";

// @ts-ignore
export function DrawerContent(props) {
  const state = useContext(ThemeContext)
  const langState = useContext(LanguageContext)
  const LAN = langState.language.language

  const Colors = state.theme;
  // @ts-ignore
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

  const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: "bold",
      color: Colors.secondary_color
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      color: Colors.secondary_color
    },
    row: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 15,
    },
    paragraph: {
      fontWeight: "bold",
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: Colors.secondary_color,
      borderTopWidth: 1,
    },
    preference: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
  

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
              label={LAN.main_page}
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
              label={LAN.chat_flow}
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
              label={LAN.profile_page}
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
              label={LAN.settings_page}
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
          label={LAN.logout}
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
