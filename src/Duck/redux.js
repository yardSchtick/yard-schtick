import axios from "axios";

const initialState = {
    user:{},
    sales: []
}


const GET_SALES = 'GET_SALES';



export function getSales(){
    const data = axios.get('/api/getAllSales').then(response => {
        console.log('response', response);
        return response.data;
    })

    return{
        type: GET_SALES,
        payload: data
    }
}
export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_SALES + '_FULFILLED': 
            return Object.assign({}, state, {sales: action.payload})
        default:
            return state
    }
}