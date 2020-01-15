import React, {useContext} from 'react'
import {Route, Redirect } from 'react-router-dom'

//contex api
import {UserContext} from '../context/UserContext'

// Checks if the user is loggedin / authorized
export default function AuthRoute({component: Component, ...rest}) {
    const {user} = useContext(UserContext)
    return (
       <Route 
            {...rest}
            render = {
                props => user ? <Redirect to= "/" /> : <Component {...props} />
            }/>
    )
}
