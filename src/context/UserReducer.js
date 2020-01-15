import {LOGIN, LOGOUT} from './types' 

// AuthorizedUserReducer 
function userAuthReducer(state,action) {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                user:action.payload
            }

        case LOGOUT:
            return{
                ...state,
                user: null
            }

        default:
            return state
    }
}

export {userAuthReducer} 