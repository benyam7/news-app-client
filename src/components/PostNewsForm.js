import React, {useState} from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation } from '@apollo/react-hooks'

// fetchs all news
import {GET_NEWS_QUERY} from '../gqlQueries/queries'


// gives functionality to post a news for an admin
const PostNewsForm = () => {
    let errData = ''
    const [values, setValues] = useState({
        title: '',
        body: '',
        newsPhotoUrl: ''
       
    })

    const onChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
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
        proxy.writeQuery({query: GET_NEWS_QUERY, data }); // to persit

        
       
    // reset the field once published
       values.body = ''
       values.title = ''
       values.newsPhotoUrl = ''
        },
        onError(err){ 
            errData = getErr(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            // errData = getErr(error)
            // console.log(err)
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
    <Form onSubmit = {onSubmit}>
    <h3>Post News: </h3>
    <Form.Input
      
      
      label='News Title'
      placeholder='News Title'
      name = "title"
      type = "text"
      value = {values.title}
      onChange = {onChange}
      error = {errData ? errData.graphQLErrors[0].message : false}
    />
      <Form.Input
      label='News Photo URL'
      placeholder='News Photo URL'
      name = "newsPhotoUrl"
      type = "text"
      value = {values.newsPhotoUrl}
      onChange = {onChange}
      >
        
    </Form.Input>

  <Form.Field
    id='form-textarea-control-opinion'
    control={TextArea}
    label='News Body'
    placeholder='News Body'
    onChange = {onChange}
    name = "body"
    value = {values.body}
    
  />
 
  <Button type = "submit">Publish</Button>
</Form>
)
 
}

// mutation that posts news
const POST_NEWS = gql`
    
    mutation post(
        $title: String!
        $body: String!
        $newsPhotoUrl: String!
    ){
            postNews(
                newsTitle: $title,
                newsBody: $body
                newsPhotoUrl: $newsPhotoUrl
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

            }
    }

    `

export default PostNewsForm
