import React from 'react'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import {ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context' // to automatically add authorization header for every authorized path

import App from './App'



const httpLink = createHttpLink({
    uri: 'https://desolate-citadel-49962.herokuapp.com/'
})
 
const authHeader = setContext(
    () => {
        const token = localStorage.getItem('token')
        return{
            headers:{
                Authorization: token ? `Bearer ${token}` : ''
            }
        }
    }
)


const client = new ApolloClient({
    link: authHeader.concat(httpLink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)