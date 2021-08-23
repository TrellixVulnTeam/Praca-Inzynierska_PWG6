import { StyleSheet } from "react-native";
import { useContext } from "react";
import {ThemeContext} from "../../model/themes"

const state = useContext(ThemeContext)
const Colors = state.theme;
export const styles = StyleSheet.create({
    container: { flex: 1 },
    spacer: { 
        height: 50, 
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white
    },
    spacer_line: { 
        height: 2,
        width: "91%", 
        backgroundColor: Colors.grey2 
    },
    header: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        alignItems: "center"
    },
    header_text: {
        fontWeight: "bold",
        color: Colors.black,
        paddingLeft: 10,
        paddingBottom: 3,
        fontSize: 32
    },
    body_main: {
        flex: 11,
        backgroundColor: Colors.white,
        borderTopColor: Colors.grey2,
        borderTopWidth: 2,
        flexDirection: "column"
    },
    body_main_text_container:{
        paddingHorizontal: 20,
        paddingTop: 20
    },
    body_main_text_main:{
        fontSize: 25,
        fontWeight: "bold",
        color: Colors.black
    },
    body_main_text_secondary:{
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.grey2
    },
    body_upgrade_button: {
        flex: 1, 
        borderWidth: 2, 
        borderColor: 
        Colors.orange, 
        justifyContent: "center", 
        alignItems: "center"
    }
})