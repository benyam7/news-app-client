import React , { useState, useContext} from 'react'
import {Form, Icon, Header, Button} from 'semantic-ui-react'
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
        context.login(result.data.login)
        props.history.push('/')
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
        <div className = "form-signin-container"  >
          <Form onSubmit = {onSubmit} noValidate > 
         

<Header as='h2' icon textAlign='center'>
      <Icon name='newspaper outline' circular />
      <Header.Content>Sign In</Header.Content>
    </Header>
           

            <Form.Input 
                label = "User Name"
                placeholder = "User Name"
                name = "userName"
                type = "text"
                value = {values.userName}
                onChange = {onChange}
                error = {errors.userNotFound || errors.userName}
             
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
            <br />        

    <Button animated = 'fade' basic secondary style = {{width: 300 , padding: 10}} type = "submit" loading = {loading}>
      <Button.Content visible style = {{color: "#704847"}}>Sign In</Button.Content>
      <Button.Content hidden>
        <Icon name='sign in' />
      </Button.Content>
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