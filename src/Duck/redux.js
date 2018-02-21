import axios from "axios";

const initialState = {
    user: null,
    sales: [],
    url: '/mapview'
}

const DEMO = 'DEMO'
const GET_URL = 'GET_URL'
const GET_SALES = 'GET_SALES';
const GET_USER = 'GET_USER'

// export function getDemo(){
//     return{
//         type:DEMO,
//         payload: res.data
//     }
// }

export function GETURL(url) {
    return {
        type: GET_URL,
        payload: url
    }
}

export function getSales() {
    const data = axios.get('/api/getAllSales').then(response => {
        return response.data;
    })

    return {
        type: GET_SALES,
        payload: data
    }
}

export function GETUSER() {
    return {
        type: GET_USER,
        payload: axios.get('/api/getUser').then()
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DEMO:
            return Object.assign({}, state, { recipeToGet: action.payload });
        case GET_URL:
            return Object.assign({}, state, { url: action.payload })
        case GET_SALES + '_FULFILLED':
            return Object.assign({}, state, { sales: action.payload })
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload.data[0]})
        default:
            return state
    }
}
