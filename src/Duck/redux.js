import axios from "axios";

const initialState = {
    user: null,
    sales: [],
    url: '/mapview',
    newSale: {
        start_time: '',
        end_time: '',
        start_date: '',
        end_date: ''
    }
}

const DEMO = 'DEMO'
const GET_URL = 'GET_URL'
const GET_USER = 'GET_USER';
const ADD_NEW_SALE = 'ADD_NEW_SALE'
const ADD_DESCRIPT = "ADD_DESCRIPT"
const EDIT_SALE = "EDIT_SALE"
const GET_SALES = 'GET_SALES'
// const GET_LNG = 'GET_LNG';
// const GET_LAT = 'GET_LAT';

// export function getDemo(){
//     return{
//         type:DEMO,
//         payload: res.data
//     }
// }

export function getSales(longitude, latitude, distance) {
    const data = axios.get(`/api/distance?longitude=${longitude}&latitude=${latitude}&distance=${distance}`)
    .then(res => {
        return res.data
    })
    return {
        type: GET_SALES,
        payload: data
    }
}

export function GETURL(url) {
    return {
        type: GET_URL,
        payload: url
    }
}

export function GETUSER() {
    return {
        type: GET_USER,
        payload: axios.get('/api/getUser').then()
    }
}

export function ADDNEWSALE(sale) {
    return {
        type: ADD_NEW_SALE,
        payload: sale
    }
}

export function ADDDESCRIPT(obj) {
    return {
        type: ADD_DESCRIPT,
        payload: obj
    }
}
export function EDITSALE(pop) {
    return {
        type: EDIT_SALE,
        payload: pop
    }
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        // case GET_LAT:
        //     return Object.assign({}, state, {lat: action.payload})
        // case GET_LNG:
        //     return Object.assign({}, state, {lng: action.payload})
        case GET_SALES + '_FULFILLED':
            return Object.assign({}, state, {sales: action.payload});
        case DEMO:
            return Object.assign({}, state, { recipeToGet: action.payload });
        case GET_URL:
            return Object.assign({}, state, { url: action.payload })
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload.data[0] })
        case ADD_NEW_SALE:
            return Object.assign({}, state, { newSale: action.payload })
        case ADD_DESCRIPT:
            var tempObj = Object.assign({}, state.newSale, { sale_desc: action.payload.sale_desc }, { sale_img: action.payload.sale_img })
            return Object.assign({}, state, { newSale: tempObj })
        case EDIT_SALE:
            return Object.assign({}, state, { newSale: action.payload })
        default:
            return state
    }
}
