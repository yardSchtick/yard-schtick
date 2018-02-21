import axios from "axios";

const initialState = {
    user:{},
    url: '/mapview'
}

const DEMO ='DEMO'
const GET_URL = 'GET_URL'

// export function getDemo(){
//     return{
//         type:DEMO,
//         payload: res.data
//     }
// }

export function getURL(url) {
    return {
        type: GET_URL,
        payload: url
    }
}
export default function reducer(state = initialState, action){
    switch(action.type){
        case DEMO:
            return Object.assign( {}, state, { recipeToGet: action.payload } );
        case GET_URL:
            return Object.assign( {}, state, {url: action.payload})
        default:
            return state
    }
}