import axios from "axios";

const initialState = {
    user: null,
    sales: [],
    url: '/mapview',
    newSale: {
        id: '',
        start_time: '',
        end_time: '',
        start_date: '',
        end_date: '',
        sale_img: '',
        sale_name: '',
        sale_desc: ''
    }
}

const DEMO = 'DEMO'
const GET_URL = 'GET_URL'
const GET_USER = 'GET_USER';
const ADD_NEW_SALE = 'ADD_NEW_SALE'
const ADD_DESCRIPT = "ADD_DESCRIPT"
const EDIT_SALE = "EDIT_SALE"
const CLEAR_SALE = "CLEAR_SALE"

// export function getDemo(){
//     return{
//         type:DEMO,
//         payload: res.data
//     }
// }

export function getSales() {
    return {
        type: "Dan is a butt",
        payload: 'Dan is what he eats'
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

export function CLEARSALE() {
    return {
        type: CLEAR_SALE
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DEMO:
            return Object.assign({}, state, { recipeToGet: action.payload });
        case GET_URL:
            return Object.assign({}, state, { url: action.payload })
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload.data[0] })
        case ADD_NEW_SALE:
            return Object.assign({}, state, { newSale: action.payload })
        case ADD_DESCRIPT:
            var tempObj = Object.assign({}, state.newSale, { sale_desc: action.payload.sale_desc }, { sale_img: action.payload.sale_img }, { sale_name: action.payload.sale_name })
            return Object.assign({}, state, { newSale: tempObj })
        case EDIT_SALE:
            return Object.assign({}, state, { newSale: action.payload })
        case CLEAR_SALE:
            return Object.assign({}, state, { newSale: {
                start_time: '',
                end_time: '',
                start_date: '',
                end_date: '',
            }})
        default:
            return state
    }
}
