import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import ChatsScreen from "./containers/chat/ChatsScreen";
import ProfileScreen from "./containers/profile/ProfileScreen";
import { DrawerContent } from "../main_components/drawer/DrawerContent";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Chats" component={ChatsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
export default Main;
