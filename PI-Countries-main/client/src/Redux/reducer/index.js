import { FILTER_COUNTRIES,
         FILTER_BY_ACTIVITIES,
         GET_COUNTRIES,
         GET_COUNTRIES_BY_NAME,
         GET_TOURIST_ACTIVITIES, 
         ORDER_COUNTRIES_ALF,
         ORDER_COUNTRIES_POP, GET_COUNTRY_DETAIL,
         ADD_TOURIST_ACTIVITIES,
         GET_COUNTRIES_QUERY,
        } 
from "../action-types/actionTypes";


const inicialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    activities: [],
    detail: {}
}


const rootReducer = (state = inicialState, action) => {
    switch(action.type){
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }  
        case GET_COUNTRY_DETAIL:
            return{
                ...state, 
                detail: action.payload
                }
        case GET_TOURIST_ACTIVITIES:
            return{
                ...state, 
                allActivities: action.payload
                }
        case GET_COUNTRIES_QUERY:
            return{
                ...state,
                countries: action.payload
            }
        case GET_COUNTRIES_BY_NAME:
            let name = action.payload === "" ? state.allCountries : state.countries.filter((e)=> e.name.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state, 
                countries: name
            }
        //para el post, tiene que estar 
        case ADD_TOURIST_ACTIVITIES: 
            return{
                ...state
            }
        case ORDER_COUNTRIES_ALF:
            let sortedArr = action.payload === "asc" ? 
            state.countries.sort (function (a,b){
                if(a.name > b.name) return 1;
                if(b.name > a.name) return -1;
                return 0
            }):
            state.countries.sort (function (a,b){
                if(a.name > b.name) return -1;
                if(b.name > a.name) return 1;
                return 0
            });
            return{
                ...state,
                countries: sortedArr
            }
        case ORDER_COUNTRIES_POP:
            let sortedArrPop = action.payload === "mayp" ?
            state.countries.sort(function (a,b){
                if(a.population > b.population) return 1;
                if(b.population > a.population) return -1;
                return 0
            }):
            state.countries.sort(function(a,b){
                if(a.population > b.population) return -1;
                if(b.population < a.population) return 1;
                return 0
            });
            return {
                ...state,
                countries: sortedArrPop 
            }
        case FILTER_COUNTRIES:
                const allCountries = state.allCountries
                const continentFiltered = action.payload === "All" ? allCountries 
                                                                :allCountries.filter(e => e.continent === action.payload)

            return{
                   ...state, 
                   countries: continentFiltered
            }          
                                            
        case FILTER_BY_ACTIVITIES:
                const allCountriesAct = state.allCountries;
                const countriesFilteredAct = allCountriesAct.filter((pais)=>{
                return pais.Activities.length > 0;
            });

            let array = [];
            for (let i = 0; i < countriesFilteredAct.length; i++) {
                for (let j = 0; j < countriesFilteredAct[i].Activities.length; j++) {
                 if (countriesFilteredAct[i].Activities[j].name === action.payload) {
                       array.push(countriesFilteredAct[i]);
                    }
                }
            }
            const filter = action.payload === "All" ? allCountriesAct : array;
             return{
                ...state, 
                countries: filter
            }

        default: 
        return state;
    }

}

export default rootReducer;
