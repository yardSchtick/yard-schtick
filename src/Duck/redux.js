import axios from "axios";

const initialState = {
    user: null,
    sales: [],
    url: '/mapview',
    newSale: {sale_name: 'placeholder',
            sale_desc: 'witchdocter',
            start_time: '10:00:00',
            end_time: '12:00:00',
            start_date: '2018-03-09',
            end_date: '2018-03-10'}
}

const DEMO = 'DEMO'
const GET_URL = 'GET_URL'
const GET_SALES = 'GET_SALES';
const GET_USER = 'GET_USER';
const ADD_NEW_SALE = 'ADD_NEW_SALE'

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

export function ADDNEWSALE(sale) {
    return {
        type: ADD_NEW_SALE,
        payload: sale
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
        case ADD_NEW_SALE:
            return Object.assign({}, state, {newSale: action.payload})
        default:
            return state
    }
}
