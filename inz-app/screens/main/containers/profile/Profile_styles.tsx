import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../../../../model/themes"

const state = useContext(ThemeContext)
const Colors = state.theme;

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.white },
    custom_top_nav: {
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: Colors.secondary_color,
      borderRadius: 10,
    },
    settingsTextBar: {
      flex: 3,
      alignItems: "center",
      justifyContent: "center"
    },
    user_info_container:{
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingVertical: 5
    },
    user_info_text:{
        fontSize: 18,
        fontWeight: 'normal',
        color: Colors.main_color,
        paddingRight: 20
    },
    textInput: {
      flex: 1,
      // @ts-ignore
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingTop: 13,
      paddingLeft: 5,
      color: Colors.main_color
    },
    textInputContainer: {
      borderColor: Colors.main_color, 
      borderWidth: 1, 
      borderRadius: 15, 
      flex: 1 
    },
    settingsText: {
      color: Colors.main_color,
      fontSize: 28,
      fontWeight: 'bold'
    },
    main_drawer_icon: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    content_container: {
      flex: 9,
      backgroundColor: Colors.white,
    },
  });
