import React, {useContext} from 'react'
import moment from 'moment'
import { Card, Divider, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


import {UserContext} from '../context/UserContext'
import LikeButton from '../components/LikeButton'
import DeleteButton from './DeleteButton'
function NewsCard(props){
    // const {body, createdAt, id, userName, likeCount,likes, commentCount } = props.news

    const {news : {body, createdAt, title,  id, userName, author, likeCount,likes, commentCount,newsUrl, newsPhotoUrl }} = props
    const {user } = useContext(UserContext)

    return (
        <Card fluid style = {{top: user && (user.userName !== 'admin' ? 150 : -40), marginLeft : 30, marginBottom: 20 , width: user && 1050}}>
         
      <Card.Content>
        <Image
          circular
          avatar
          floated='right'
          size='mini'
          src = 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg'
        />
        
        <Card.Header style = {{margin : -1, marginButtom :15, color : "#871f1d" }} >{title}</Card.Header>
       
        <Card.Meta  style = {{margin :3}} >{moment(createdAt).format("dddd, MMMM Do YYYY")}</Card.Meta>
        <Card.Meta  style = {{marginLeft: 3}} >By { author}</Card.Meta>
        <Divider fitted />
        <Card.Description as = {Link} style = {{marginTop :11, marginButtom :14 , color : "#000"}} to = {!user && '/login'} onClick = {() => {
        user && window.open(`${newsUrl}`, '_blank')
        }}>
      
        {newsPhotoUrl && <Image src={newsPhotoUrl} bordered fluid size = "large" style = {{marginBottom: 14}}/>}
        <br />
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style = {{paddingLeft: 15}}>
        <LikeButton as= {Link} user = {user} news = {{id, likes, likeCount}}  />  
    <Button as= {Link} to = {user ? `/news/${id}` : '/login'} labelPosition='right' style = {{fontSize: 11}}>
      <Button basic icon circular>
        <Icon name='comments' />
      </Button>
      <Label as='a' basic color='gray' pointing='left' circular >
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