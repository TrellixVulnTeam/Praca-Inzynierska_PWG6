import React, {useEffect} from "react";
import {
  View,
  StyleSheet,
  Text
} from "react-native";

const Chat = ({params}) => {
  
    return (
        <View style={styles.container}>
            <Text>{params.title}</Text>
        </View>
    );
};
export default Chat;

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: "white"
    }
});