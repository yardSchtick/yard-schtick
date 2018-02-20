import axios from "axios";

const initialState = {
    user:{}

}

const DEMO ='DEMO'

export function getDemo(){
    return{
        type:DEMO,
        payload: res.data
    }
}
export default function reducer(state = initalState, action){
    switch(action.type){
        case DEMO:
            return Object.assign( {}, state, { recipeToGet: action.payload } );
        default:
            return state
    }
}