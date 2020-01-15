import React , { useState, useContext} from 'react'
import {Form, Button} from 'semantic-ui-react'

import gql from 'graphql-tag'
import {useMutation } from '@apollo/react-hooks'

// Context api thing
import {UserContext} from '../context/UserContext'


function Signup(props) {
    const context = useContext(UserContext)
    // initial values for user
    let errData = ''
    const [values, setValues] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const onChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
    }

    function getErr(err){
        return err
    }
    const [createUser, {loading}] = useMutation(CREATE_USER, {
        update(_, result){
            // this runs if 200
       console.log(result)
       context.login(result.data.registerUser) // since registering means also login
       props.history.push('/') // redirect to home page singned up
      
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
            confirmPassword: values.confirmPassword,
            email: values.email
        }
    })

    const onSubmit = (e) =>
     {
         e.preventDefault()
       
         createUser()
     }

     console.log(errData)
     
    return (
        <div className = "form-container"  >
          <Form onSubmit = {onSubmit} noValidate className = { loading && 'loading'}> 
            <h1>Join</h1>

            <Form.Input
                label = "User Name"
                placeholder = "User Name"
                name = "userName"
                type = "text"
                value = {values.userName}
                onChange = {onChange}
                error = {errors.userName}
                
            />
            
            <Form.Input
                label = "Email"
                placeholder = "Email"
                type = "text"
                name = "email"
                value = {values.email}
                onChange = {onChange}
                error = {errors.email && {
                    
                        content: `${errors.email}`,
                      
                      
                }}
            />


            <Form.Input
                label = "Password"
                placeholder = "Password"
                name = "password"
                type = "password"
                value = {values.password}
                onChange = {onChange}
                error = {errors.password }
            />


            <Form.Input
                label = "Confirm Password"
                type = "password"
                placeholder = "Confirm Password"
                name = "confirmPassword"
                value = {values.confirmPassword}
                onChange = {onChange}
                error = {errors.confirmPassword}
            />
        
            <Button type = "submit">
               Join Now
            </Button>
          </Form>
        </div>
    )
}


const CREATE_USER = gql`

    mutation registerUser(
        $userName: String!
        $password: String!
        $confirmPassword: String!
        $email: String!
    ){

        registerUser(
            registerUserInput: {
                userName: $userName
                password: $password
                confirmPassword: $confirmPassword
                email: $email
            }
        ) {
            id
            email 
            userName 
            createdAt 
            token
        }

    }

`
export default Signup