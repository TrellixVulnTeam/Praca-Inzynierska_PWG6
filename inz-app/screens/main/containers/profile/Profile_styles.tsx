import { StyleSheet } from "react-native";
import { Colors } from "../../../../model/colors";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.secondary_color },
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
        paddingVertical: 20
    },
    user_info_text:{
        fontSize: 20,
        fontWeight: 'normal',
        color: Colors.main_color,
        paddingRight: 20
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === "ios" ? 0 : -12,
      paddingTop: 13,
      color: Colors.main_color
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
      backgroundColor: Colors.secondary_color,
    },
  });
