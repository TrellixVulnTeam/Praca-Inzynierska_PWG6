import { useState } from 'react';
import { APIvars } from '../networking/API'
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
const chatFunctions = (user, component) => {

    const [resp, setResp] = useState()

    switch(component){
        case 'FlowChats':
            return user && ['grupa-rowerowa', 'grupa-motocyklowa', 'grupa-kwiatowa']
        case 'MainChats':
            return user && ['grupa-rowerowa', 'grupa-motocyklowa']
    }
}   

export default chatFunctions;

// @ts-ignore
const call = async (user) => {
        await fetch(APIvars.prefix + "://" + APIvars.ip + ":" + APIvars.port + "/getUserInfo", {
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
        
    })
}  

