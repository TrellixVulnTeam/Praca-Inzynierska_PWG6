import { APIvars } from '../networking/API'

// @ts-ignore
const chatFunctions = (user, component) => {

    // TODO Zapytanie do backendu o czaty
    switch(component){
        case 'FlowChats':
            return user && ['grupa-rowerowa', 'grupa-motocyklowa', 'grupa-kwiatowa']
        case 'MainChats':
            return user && ['grupa-rowerowa', 'grupa-motocyklowa']
    }
}   

export default chatFunctions;