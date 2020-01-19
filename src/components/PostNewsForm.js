import React, {useState, useEffect} from 'react'
import { Form, TextArea, Button, Icon, Header } from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation } from '@apollo/react-hooks'
import {GET_NEWS_QUERY} from '../gqlQueries/queries'

const PostNewsForm = () => {
    
    let errData = ''

    const [values, setValues] = useState({
        title: '',
        body: '',
        newsPhotoUrl: '',
        author: '',
        newsUrl: '',
        
    })

    useEffect(() => {
  
    }, [values])


    const onChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
        console.log(e.target.value)
    }
    function getErr(err){
        return err
    }
    const [postNews, {errors}] = useMutation(POST_NEWS, {
        update(proxy, result){
        // fix the not reading form the cache
        const data = proxy.readQuery({
            query: GET_NEWS_QUERY
        }); // the all the data inside of the cache is in data
        console.log(errors)
        data.getNews = [result.data.postNews, ...data.getNews];
        proxy.writeQuery({query: GET_NEWS_QUERY, data }); // to persist
       
       
    // reset the field once published
 
       setValues({
        body : '',
        title : '',
        newsPhotoUrl : '',
        author : '',
        newsUrl : '',
       })

        },
        onError(err){ 
            errData = getErr(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err)
        },
        variables: values
    })

    const onSubmit = (e) =>
     {
         e.preventDefault()
        console.log("submit")
         postNews()
         console.log(errData)
     }


    
return(
    
    <div style = {{padding: 100, paddingTop: -200}}>
      <Form onSubmit = {onSubmit} noValidate style = {{width: 600}} > 
          
          <Header as='h2' icon textAlign='center'>
      <Icon name='pencil alternate' circular style = {{color: '#871f1d'}} />
      <Header.Content>Wirte Headlines</Header.Content>
    </Header>
            
            <Form.Input
                label = "Author"
                placeholder = "Author..."
                name = "author"
                type = "text"
                value = {values.author}
                onChange = {onChange}
                
            />

            <Form.Input
                label = "News Title "
                placeholder = "News Title..."
                name = "title"
                type = "text"
                value = {values.title}
                onChange = {onChange}
                
                
            />
            
            <Form.Field
                control={TextArea}
                label='News Body'
                placeholder='News Description...'
                name='body'
                value = {values.body}
                onChange = {onChange}
            />

            
            <Form.Input
                label = "Actual News Url"
                placeholder = "News Url"
                name = "newsUrl"
                type = "text"
                value = {values.newsUrl}
                onChange = {onChange}
                
            />
          
          <Form.Input
                label = "News Photo Url"
                placeholder = "News Photo Url..."
                type = "text"
                name = "newsPhotoUrl"
                value = {values.newsPhotoUrl}
                onChange = {onChange}
               
            />
        
          

            <Button animated='fade' basic icon style = {{ padding: 10}}  type = 'submit' floated = 'right'>
      <Button.Content visible>Post</Button.Content>
      <Button.Content hidden style = {{color: '#871f1d'}}>
        <Icon name='pencil alternate' />
      </Button.Content>
    </Button>
          </Form>
    </div>

)
 
}

const POST_NEWS = gql`
    
    mutation post(
        $title: String!
        $body: String!
        $newsPhotoUrl: String!
        $author: String!
        $newsUrl: String!
    ){
            postNews(
                newsTitle: $title,
                newsBody: $body
                newsPhotoUrl: $newsPhotoUrl
                author: $author
                newsUrl: $newsUrl
            ){
                id
                body
                createdAt
                userName
                likes{
                    id
                    userName 
                    createdAt
                }
                likeCount
                comments{
                    id
                    body
                    userName
                    createdAt
                }
                commentCount
                newsPhotoUrl
                newsUrl
            }
    }

    `

export default PostNewsForm
