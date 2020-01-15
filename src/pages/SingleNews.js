import React, {useContext} from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {Grid, Image, Comment, Header, Card, Button, Icon, Label } from 'semantic-ui-react'

import moment from 'moment'
import DeleteButton from '../components/DeleteButton'

import LikeButton from '../components/LikeButton'
import CommentList from '../components/CommentList'

import {UserContext} from '../context/UserContext'
import AddComment from '../components/AddComment'



export default function SingleNews(props) {
    
    const newsId = props.match.params.newsId;
    console.log(newsId)

    let singleNewsData = ''
    const { data , loading} = useQuery(GET_SINGLE_NEWS,{
        variables : {
            newsId
        }
    })

    console.log(`Loading: ${loading}`)
    console.log(data)


    const {user} = useContext(UserContext)
    console.log("user", user)
 
    if(data){
        singleNewsData = { data : data.getSingleNews }
        console.log(`singleNewsData :`)
        console.log(singleNewsData)
    }

    function deleteNews() {
        props.history.push('/');
        console.log('pushed to /')
      }

    let singleNews;
    if(!singleNewsData.data) {
        singleNews = (<p>Loading news...</p>)
    }else{

        const {id, body, createdAt,title, userName, comments, likes, likeCount, commentCount} = singleNewsData.data
        singleNews = (
            <Grid>
            <Grid.Row>
              
              <Grid.Column width={10} className = "ui container">
                <Card fluid>
                  <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{body}</Card.Description>
                  </Card.Content>
                  <hr />
                  <Card.Content extra>
                    <LikeButton user={user} news={{ id, likeCount, likes }} />
                    <Button
                      as="div"
                      labelPosition="right"
                      onClick={() => console.log('Comment on post')}
                    >
                      <Button basic color="blue" circular icon>
                        <Icon name="comments" />
                      </Button>
                      <Label basic color="blue" pointing="left" circular>
                        {commentCount}
                      </Label>
                    </Button>
                    {user && user.userName === userName && (
                      <DeleteButton newsId={id} callback={deleteNews} onClick = {props.history.push('/')}/>
                    )}
                  </Card.Content>
                </Card>
                <AddComment newsId = {id}/>
                <Comment.Group>
        <Header as='h3' dividing>
          {comments.length  > 0 ? 'Comments' : 'No Comments '}
            </Header>
                  <CommentList comments  = {comments} user = {user} newsId = {id}/>
                  </Comment.Group>    
    
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
    }



    return singleNews
}

const GET_SINGLE_NEWS = gql`

    query($newsId: String!){
        getSingleNews(newsId: $newsId){
            body
            id 
            title
            createdAt
            userName
            likeCount
            likes{
                userName
            }
            commentCount
            comments{
                id 
                userName
                createdAt
                body
            }
        }
    }
`
