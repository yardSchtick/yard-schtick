import axios from "axios";

const initialState = {
    user: null,
    sales: [],
    url: '/mapview',
    newSale: {
        id: undefined,
        start_time: '',
        end_time: '',
        start_date: '',
        end_date: '',
        sale_img: '',
        sale_name: '',
        sale_desc: ''
    },
    distance: 20
}

const DEMO = 'DEMO'
const GET_URL = 'GET_URL'
const GET_USER = 'GET_USER';
const ADD_NEW_SALE = 'ADD_NEW_SALE'
const ADD_DESCRIPT = "ADD_DESCRIPT"
const EDIT_SALE = "EDIT_SALE"
const GET_SALES = 'GET_SALES'
const CHANGE_DISTANCE = 'CHANGE_DISTANCE'
const CLEAR_SALE = "CLEAR_SALE"
const SET_USER = "SET_USER"
const SET_SALE = "SET_SALE"

// export function getDemo(){
//     return{
//         type:DEMO,
//         payload: res.data
//     }
// }

export function changeDistance(val){
    return {
        type: CHANGE_DISTANCE,
        payload: val   
    }
}
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
        payload: axios.get('/auth/me').then()
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

export function SETUSER(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function SETSALE(sale) {
    return {
        type: SET_SALE,
        payload: sale
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DISTANCE:
            return Object.assign({}, state, {distance: action.payload})
        case GET_SALES + '_FULFILLED':
            return Object.assign({}, state, {sales: action.payload});
        case DEMO:
            return Object.assign({}, state, { recipeToGet: action.payload });
        case GET_URL:
            return Object.assign({}, state, { url: action.payload })
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload.data })
        case ADD_NEW_SALE:
            var tempObj = Object.assign({}, state.newSale, action.payload)
            return Object.assign({}, state, { newSale: tempObj })
        case ADD_DESCRIPT:
            var descObj = Object.assign({}, state.newSale, { sale_desc: action.payload.sale_desc }, { sale_img: action.payload.sale_img }, { sale_name: action.payload.sale_name })
            return Object.assign({}, state, { newSale: descObj })
        case EDIT_SALE:
            return Object.assign({}, state, { newSale: action.payload })
        case SET_USER:
            return Object.assign({}, state, {user: action.payload})
        case SET_SALE:
            return Object.assign({}, state, {sales: action.payload})
        case CLEAR_SALE:
            return Object.assign({}, state, {
                newSale: {
                    id: undefined,
                    start_time: '',
                    end_time: '',
                    start_date: '',
                    end_date: '',
                    sale_img: '',
                    sale_name: '',
                    sale_desc: ''
                }
            })
        default:
            return state
    }
}
