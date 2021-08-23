import React, { useContext, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Switch, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from "react-native-vector-icons/AntDesign";
// import { styles } from "./settings_styles" 
import { ThemeContext } from "../../../../model/themes"
import { LanguageContext } from "../../../../languages/translator"


const Settings = ({ navigation }) => {

    const [removeOriginal, setRemoveOriginal] = useState(false)
    const [isEn, setIsEn] = useState(true)
    const state = useContext(ThemeContext)
    const langState = useContext(LanguageContext)
    const LAN = langState.language.language

    const Colors = state.theme;

    const [data, setData] = useState({
        darkMode: false
    })

    const onPressMain = () => {
        navigation.goBack();
    }
    const onPressDarkMode = () => {
        setData({
            ...data,
            darkMode: !data.darkMode
        })
        state.toggleTheme()
    }
    const onPressRemoveOriginal = () => {
        setRemoveOriginal(!removeOriginal)
    }
    const onPressLanguage = () => {
        if(isEn){
            langState.changeLanguage("pl")
            setIsEn(false)
        } else {
            langState.changeLanguage("en") 
            setIsEn(true)
        }
    }
    const onPressAltitudeUnits = () => {
    }
    const onPressRateExiFly = () => {
    }
    const onPressSupport = () => {
    }
    const onPressShare = () => {
    }
    const onPressUpgrade = () => {
    }

    const styles = StyleSheet.create({
        container: { flex: 1 },
        spacer: { 
            height: 50, 
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.secondary_color
        },
        spacer_line: { 
            height: 2,
            width: "91%", 
            backgroundColor: Colors.main_color 
        },
        header: {
            flex: 1,
            flexDirection: "row",
            backgroundColor: Colors.secondary_color,
            paddingHorizontal: 20,
            alignItems: "center"
        },
        header_text: {
            fontWeight: "bold",
            color: Colors.secondary_color,
            paddingLeft: 10,
            paddingBottom: 3,
            fontSize: 32
        },
        body_main: {
            flex: 11,
            backgroundColor: Colors.secondary_color,
            borderTopColor: Colors.main_color,
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
            color: Colors.main_color
        },
        body_main_text_secondary:{
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.main_color
        },
        custom_top_nav: {
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: Colors.main_color,
          borderRadius: 10,
        },
        settingsTextBar: {
          flex: 3,
          alignItems: "center",
          justifyContent: "center"
        },
        settingsText: {
          color: Colors.secondary_color,
          fontSize: 28,
          fontWeight: 'bold'
        },
        main_drawer_icon: {
          paddingLeft: 20,
          paddingRight: 20,
          color: Colors.secondary_color
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

    return (
        <View style={styles.container}>
            <View style={styles.custom_top_nav}>
          <View
            style={{
              flex: 1,
            }}
          />
          <View style={styles.settingsTextBar}>
            <Text style={styles.settingsText}>PROFIL</Text>
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
            <View style={styles.body_main}>
                <View style={styles.body_main_text_container}>
                    <TouchableOpacity onPress={onPressDarkMode}>
                        <Text style={styles.body_main_text_main}>{LAN.dark_mode}</Text>
                        {!data.darkMode ?
                            <Text style={{...styles.body_main_text_secondary, color: Colors.orange}}>On</Text>
                            :
                            <Text style={styles.body_main_text_secondary}>Off</Text>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{...styles.body_main_text_container, flexDirection: "row", justifyContent: "space-between"}}>
                    <TouchableOpacity onPress={onPressRemoveOriginal}>
                        <Text style={styles.body_main_text_main}>{LAN.remove_oryginal}</Text>
                    </TouchableOpacity>
                    <Switch
                        style={{ marginTop: 0 }}
                        trackColor={{false: Colors.grey2, true: Colors.orange}}
                        thumbColor={Colors.grey1}
                        onValueChange={onPressRemoveOriginal}
                        value={removeOriginal}
                    />
                </View>
                <View style={styles.body_main_text_container}>
                    <TouchableOpacity onPress={onPressLanguage}>
                        <Text style={styles.body_main_text_main}>{LAN.language}</Text>
                        <Text style={styles.body_main_text_secondary}>{LAN.system_language}</Text>
                        
                    </TouchableOpacity>
                </View>
                <View style={styles.body_main_text_container}>
                    <TouchableOpacity onPress={onPressAltitudeUnits}>
                        <Text style={styles.body_main_text_main}>{LAN.altitude_units}</Text>
                        <Text style={styles.body_main_text_secondary}>{LAN.meters}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacer}>
                    <View style={styles.spacer_line}/>
                </View>
                <View style={{...styles.body_main_text_container, paddingTop: 0}}>
                    <TouchableOpacity onPress={onPressRateExiFly}>
                        <Text style={styles.body_main_text_main}>{LAN.rate_bttn}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body_main_text_container}>
                    <TouchableOpacity onPress={onPressSupport}>
                        <Text style={styles.body_main_text_main}>{LAN.support_bttn}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body_main_text_container}>
                    <TouchableOpacity onPress={onPressShare}>
                        <Text style={styles.body_main_text_main}>{LAN.share_bttn}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spacer}>
                    <View style={styles.spacer_line}/>
                </View>
                <View style={{...styles.body_main_text_container, paddingTop: 0}}>
                    <Text style={{...styles.body_main_text_secondary, fontSize: 10}}>{LAN.version}</Text>
                    <Text style={{...styles.body_main_text_secondary, fontSize: 10}}>{LAN.made_by}</Text>
                </View>
            </View>
        </View>
    )
}

export default Settings;