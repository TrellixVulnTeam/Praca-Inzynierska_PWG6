import { useState } from 'react';
import { APIvars } from '../networking/API'
import AsyncStorage from "@react-native-async-storage/async-storage";

// @ts-ignore
const chatFunctions = (user, component) => {
    switch(component){
        case 'FlowChats':
            return user && call(user)
        case 'MainChats':
            return user && call(user)
    }
}   

export default chatFunctions;

// @ts-ignore
const call = (user) => {
    fetch(APIvars.prefix + "://" + APIvars.ip + ":" + APIvars.port + "/getUserInfo", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        UserToken: user.uid
        })
    })
    .then((response) => response.json())
    .then((responseJSON) => {
        AsyncStorage.setItem("ChatFlow", responseJSON.ChatFlow);
        AsyncStorage.setItem("MainChats", responseJSON.MainChats);
        return responseJSON.ChatFlow
    })
}  

