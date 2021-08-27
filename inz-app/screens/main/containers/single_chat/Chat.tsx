import React, {useEffect} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput
} from "react-native";
import { Colors } from "../../../../model/colors";
// @ts-ignore 
import FontAwesome from "react-native-vector-icons/AntDesign";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase";

import moment from 'moment'
import { useState } from "react";

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

interface Props {
    state: {
        show: boolean,
        chat: string
    },
    setState: (state: {}) => void
}

const auth = firebase.auth();

const Chat = ({state, setState} : Props ) => {

    const firestore = firebase.firestore();
    const [inputValue, setInputValue] = useState('')

    const [user] = useAuthState(auth);

    const messagesRef = firestore.collection(state.chat);
    const query = messagesRef.orderBy('createdAt', 'desc').limit(8);
    const [messages] = useCollectionData(query, {idField: 'id'});
    

    // @ts-ignore
    const sendMessage = async(e) => {
        e.preventDefault();

        // @ts-ignore
        const {uid} = auth.currentUser;
        if (inputValue != ''){
            await messagesRef.add({
                text: inputValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: uid
            });
    
            setInputValue('')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {setState({...state, show: false})}} style={styles.backButtonStyle}>
                    {/* TODO wyglad przycisku cofania */}
                    <FontAwesome
                        name="arrowleft"
                        color={Colors.white}
                        size={35}
                        style={styles.main_drawer_icon}
                    />
                </TouchableOpacity>
                <View style={styles.restOfHeader}>
                    <Text style={styles.headerText}>{state.chat}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.messages}>
                    <FlatList
                        data={messages}
                        // @ts-ignore
                        renderItem={msg => <ChatMessage key={msg.id} message={msg}/>} 
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput 
                        placeholder="Wiadomość"
                        placeholderTextColor="#666666"
                        style={styles.input} 
                        value={inputValue} 
                        onChangeText={setInputValue}
                    />
                    <TouchableOpacity style={styles.send} onPress={sendMessage}>
                        <Ionicons
                            name="send"
                            color={"#666564"}
                            size={30}
                            style={styles.sendButton}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default Chat;

// @ts-ignore
function ChatMessage(props) {
    const {text, uid, createdAt} = props.message.item;
    // @ts-ignore
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recived'; 

    if (createdAt != undefined){
        var t = new Date(Number(createdAt.seconds) * 1000)
        var formated = moment(t).format("DD.MM.yyyy hh:MM:ss")
    }else {
        var t = new Date(Number(1000000) * 1000)
        var formated = ''
    }
    
    if (messageClass == 'recived'){
        return <View style={styles.messageBox}>
            <Text style={styles.messageTextTime}>{formated}</Text>
            <View style={styles.message}> 
                <Text style={styles.messageText}>{text}</Text>
            </View>
        </View> 
    } else {
        return <View style={{...styles.messageBox, alignItems: "flex-end"}}>
            <Text style={styles.messageTextTime}>{formated}</Text>
            <View style={{...styles.message, backgroundColor: Colors.secondary_color}}> 
                <Text style={styles.messageText}>{text}</Text>
            </View>
        </View> 
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#292929",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    header: {
        flex: 0.8,
        backgroundColor: "#666564",
        flexDirection: "row",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
    body: {
        flex: 9.2,
        justifyContent: "space-between"
    },
    backButtonStyle:{
        justifyContent: "center",
        alignItems: "center"
    },
    restOfHeader:{
        flex:9,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText:{
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.main_color
    },
    main_drawer_icon: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    messages:{
        flex: 9,
        width: "100%"
    },
    messageTextTime:{
        fontSize: 10,
        paddingHorizontal: 10,
        color: "white"
    },
    inputBox:{
        flex: 0.7,
        width: "100%",
        backgroundColor: "#d1d1d1",
        flexDirection: "row"
    },
    messageBox:{
        height: 50,
        width: "100%",
        backgroundColor: "#292929",
        alignItems: "flex-start",
    },
    message:{
        flex: 1,
        width: "70%",
        backgroundColor: Colors.main_color,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10
    },
    messageText:{
        fontWeight: "bold",
        fontSize: 16
    },
    input:{
        flex: 7,
        width: "100%",
        paddingLeft: 10,
    },
    send: {
        flex:1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    sendButton:{
        paddingRight: 10,
    }
});