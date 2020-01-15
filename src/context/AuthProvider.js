import React, {useReducer} from 'react'
import {LOGIN, LOGOUT} from './types' 
import {UserContext} from './UserContext'
import decoder from 'jwt-decode'
// context api
import {userAuthReducer} from './UserReducer'



const initState = {
    user : null
}

// check if there is token in local storage and not expried
if(localStorage.getItem('token')){
    
    const decodedToken = decoder(localStorage.getItem('token'))
    console.log(decodedToken)
    decodedToken.exp * 1000 < Date.now() ?  // check if token expired
        
        localStorage.removeItem('token')
     :
        initState.user = decodedToken
    


}
// AuthProvider component
function AuthProvider(props){
    const [state, dispatch] = useReducer(userAuthReducer, initState)

    function login(userData) {
        // store the token to localstorage, to persiste the state when refreshing
        localStorage.setItem('token',userData.token)

        dispatch({
            type: LOGIN,
            payload: userData
        })
    }

    function logout(){
        // remove the stored token when logging out
        localStorage.removeItem('token')
        dispatch(
            {
                type: LOGOUT
            }
        )
    }

    return (
        <UserContext.Provider
            value = {{
                user: state.user,
                login,
                logout
            }}
            {...props}/>
            
    )
}


export {AuthProvider}
