import React , { useState, useContext} from 'react'
import {Form, Button} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation } from '@apollo/react-hooks'


// Context api thing
import {UserContext} from '../context/UserContext'

function Login(props) {
    const context = useContext(UserContext)

    let errData = ''
    // initial values for user
    const [values, setValues] = useState({
        userName: '',
        password: ''
       
    })

    const [errors, setErrors] = useState({})

    const onChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
    }

    function getErr(err){
        return err
    }
    
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, result){
            // this runs if 200
       console.log(result)
        context.login(result.data.login)
        console.log(result.data.login)
        props.history.push('/')
        // window.location.href = '/' 
       // todo fix redirecting to home pages
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors)
           
            errData = getErr(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(errData)
          
        },
        variables: {
            userName: values.userName,
            password: values.password,
        }
    })

    const onSubmit = (e) =>
     {
         e.preventDefault()
       
         loginUser()
     }

 
    return (
        <div className = "form-container test"  >
          <Form onSubmit = {onSubmit} noValidate className = { loading && 'loading'}> 
            <h1 >Login</h1>

            <Form.Input
                label = "User Name"
                placeholder = "User Name"
                name = "userName"
                type = "text"
                value = {values.userName}
                onChange = {onChange}
                error = {errors.userNotFound || errors.userName}
           
                style = {{color: "#00b5ad"}}
            />

            <Form.Input
                label = "Password"
                placeholder = "Password"
                name = "password"
                type = "password"
                value = {values.password}
                onChange = {onChange}
                error = {errors.password || errors.general}
            />


        
        
            <Button type = "submit">
                Sign Me In
            </Button>
          </Form>
        </div>
    )
}


const LOGIN_USER = gql`

    mutation registerUser(
        $userName: String!
        $password: String!
    ){

        login(
            userName : $userName,
            password : $password
        ) {
            id
            email 
            userName 
            createdAt 
            token
        }

    }

`
export default Login