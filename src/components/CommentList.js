import React from 'react'
import { Comment} from 'semantic-ui-react'
import moment from 'moment'
import DeleteButton from './DeleteButton'



export default function CommentList({comments, user, newsId}) {
  
  return(
    comments.map((comment) => (
      
      <Comment>
            {user && user.userName === comment.userName && <DeleteButton commentId = {comment.id}  newsId = {newsId}/>}
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
              <Comment.Author as='a'>{comment.userName}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(comment.createdAt).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
      </Comment>
    ))
  )
}