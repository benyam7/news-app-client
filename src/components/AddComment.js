import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'





export default function AddComment({newsId}) {

    const [body, setBody] = useState('')

    const [addComment] = useMutation(ADD_COMMENT, {
        update(){
            console.log("added")
            setBody('')
        },
        variables:{
            newsId,
            body
        }
    })
    const onSubmit = () => {
        addComment()
    }

    const onChange = (e) => {
        setBody(e.target.value)
        console.log(body)
    }


    return (
        <Form reply onSubmit = {onSubmit}>
      <Form.TextArea
        name = 'body'
        value = {body}
        onChange = {onChange}
      />
      <Button content='Add Comment' labelPosition='left' icon='edit' primary  type = 'submit' circular/>
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