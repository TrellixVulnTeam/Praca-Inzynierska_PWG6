import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import ChatsScreen from "./containers/chat/ChatsScreen";
import SettingsScreen from "./containers/settings/settings";
import MainChatsScreen from "./containers/main/MainChats";
import ProfileScreen from "./containers/profile/ProfileScreen";
import { DrawerContent } from "../main_components/drawer/DrawerContent";

const Drawer = createDrawerNavigator();

const Main = () => {

  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Chats" component={ChatsScreen} />
      <Drawer.Screen name="MainChats" component={MainChatsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};
export default Main;
