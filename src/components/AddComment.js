import React, {useState} from 'react'
import {Form, Button, Icon} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'





export default function AddComment({newsId}) {

    const [body, setBody] = useState('')
    const [error, setError] = useState(null)

    const [addComment] = useMutation(ADD_COMMENT, {
        update(){
            console.log("added")
            setBody('')
            setError(null)
        },
        variables:{
            newsId,
            body
        },

        onError(err){
            
            setError(err.graphQLErrors[0].extensions.exception.errors.body)
        }
    }
  
    )
    const onSubmit = () => {
        addComment()
    }

    const onChange = (e) => {
        setBody(e.target.value)
    }


    return (
        <Form reply onSubmit = {onSubmit}>
      <Form.TextArea
        name = 'body'
        value = {body}
        onChange = {onChange}
        placeholder = 'Type here...'
        error = {error && error}
      />
      
      <Button animated = 'fade' floated = "right" type = 'submit' className = "comment-button-single" size = "huge">
      <Button.Content hidden>Add</Button.Content>
      <Button.Content visible>
        <Icon name='plus' />
      </Button.Content>
    </Button>
    </Form>
    )
}

const ADD_COMMENT = gql`
    mutation createComment($newsId: ID!, $body: String!){
        createComment(newsId: $newsId, body: $body){
            id
            comments {
                id
                userName
                createdAt
                body
            }

            commentCount
        }
    }
`