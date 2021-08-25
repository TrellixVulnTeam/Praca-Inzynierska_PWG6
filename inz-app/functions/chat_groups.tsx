import { APIvars } from '../networking/API'

// @ts-ignore
const chatCollections = (user) => {

    // TODO Zapytanie do backendu o czaty

    return user && ['grupa-rowerowa', 'grupa-motocyklowa', 'grupa-kwiatowa']
}   

export default chatCollections;