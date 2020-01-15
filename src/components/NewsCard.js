import React, {useContext} from 'react'
import moment from 'moment'
import { Card, Divider, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

// pages
import {UserContext} from '../context/UserContext'
//Components
import LikeButton from '../components/LikeButton'
import DeleteButton from './DeleteButton'

//Defines how news are displayed
function NewsCard(props){
    // const {body, createdAt, id, userName, likeCount,likes, commentCount } = props.news

    const {news : {body, createdAt, title,  id, userName, likeCount,likes, commentCount, newsPhotoUrl }} = props
    const {user } = useContext(UserContext)
    console.log("created at: " , createdAt)

    return (
        <Card fluid style = {{marginLeft : 30, marginBottom: 20 , width: user && 1050}}>
         
      <Card.Content>
        <Image
          circular
          avatar
          floated='right'
          size='mini'
          src = 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'
        />
        
        <Card.Header style = {{marginButtom :25, color : "#00b5ad"}} >{title}</Card.Header>
       
        <Card.Meta  style = {{margin :10}} >{moment(createdAt).fromNow()}</Card.Meta>
        <Divider fitted />
        <Card.Description style = {{marginTop :25, marginButtom :50 , color : "#000"}}>
       { console.log("photo", newsPhotoUrl)}
        {newsPhotoUrl && <Image src={newsPhotoUrl} bordered fluid size = "large" style = {{marginBottom: 50}}/>}
        <br />
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style = {{paddingLeft: 15}}>
    
        <LikeButton as= {Link} user = {user} news = {{id, likes, likeCount}}  />
      
      
    <Button as= {Link} to = {user ? `/news/${id}` : '/login'} labelPosition='right' >
      <Button basic color='blue' icon circular>
        <Icon name='comments' />
    
      </Button>
      <Label as='a' basic color='blue' pointing='left' circular >
       {commentCount}
      </Label>
    </Button>
   
      {
        user && user.userName === userName &&(
          <DeleteButton newsId = {id}  />
        )
      }
      </Card.Content>
    </Card>
    )


}

export default NewsCard 