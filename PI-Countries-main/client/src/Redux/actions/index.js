import axios from "axios";
import { FILTER_COUNTRIES, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP ,GET_TOURIST_ACTIVITIES, GET_COUNTRY_DETAIL, GET_COUNTRIES_QUERY, FILTER_BY_ACTIVITIES} from "../action-types/actionTypes"; 

const getCountries = () => {
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/countries",{
        });
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

const getCountriesDetail = (id) =>{
    return async function (dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch({
                type: GET_COUNTRY_DETAIL,
                payload: json.data
            })
        }catch(error){
            console.log(error);
        }
    }
}
const getCountriesSearch = (name) =>{
    return async function(dispatch){
        try{
            let json = await axios.get(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: GET_COUNTRIES_QUERY,
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

const getActivities = () =>{
    return(dispatch) =>{
        try{
            axios.get(`http://localhost:3001/activities`)
            .then((info)=>{
                return dispatch({
                    type: GET_TOURIST_ACTIVITIES,
                    payload: info.data
                });
        })
        }catch(error){
            console.log(error)
        }
}}

const getCountriesByName = (name) =>{
    return{
        type: GET_COUNTRIES_BY_NAME,
        payload: name,
    }
}

const postActivity = (payload) =>{
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/activities`, payload)
        return response
    }
}

const orderByName = (payload) =>{
    return{
        type: ORDER_COUNTRIES_ALF,
        payload
    }
}

const orderByPop=(payload) =>{
    return{
        type: ORDER_COUNTRIES_POP,
        payload
    }

}

const filterByContinents = (payload) =>{
    return{
        type: FILTER_COUNTRIES,
        payload
    }
}

const filterByAct = (activity) => {
    return{
        type: FILTER_BY_ACTIVITIES,
        payload: activity
    }
}


export {
    getCountries,
    filterByContinents,
    orderByName,
    orderByPop,
    getCountriesDetail,
    getCountriesSearch,
    filterByAct,
    getActivities,
    postActivity,
    getCountriesByName
}
