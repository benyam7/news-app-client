import React, {useState, useEffect} from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Link} from 'react-router-dom'





export default function LikeButton({ user , news : {id, likeCount, likes}}) {
    const [liked, setLiked] = useState(false)
    // const { user } = useContext(UserContext)
    
    useEffect(
        ()=>{
            if(user && likes.find(like => like.userName === user.userName)){
                setLiked(true)
            } else setLiked(false)
        }, [user, likes]
    )

    const [likePost] = useMutation(LIKE_NEWS, {
        variables : {newsId: id}
    })
    
    const LikeButton = user ? (
        liked ? (
            <Button color = "blue" onClick= {likePost} icon circular>
                <Icon name = "eye" />
            </Button>
        ) : (
            <Button color = "blue" basic onClick= {likePost} icon circular>
                <Icon name = "eye" />
            </Button>
        )
    ) :
    (
        <Button as= {Link} to = "/login" color = "blue" basic icon circular>
            <Icon name = "eye" />
        </Button>
    )

    return (
       <Button as = "div" labelPosition= "right"  size = "mini">
           {LikeButton}
           <Label basic color = "blue" pointing = "left" circular >
               {likeCount}
           </Label>
       </Button>
    )
}

const LIKE_NEWS = gql `

    mutation likeNews($newsId: ID!){
        likeNews(newsId: $newsId){
            id
            likes
            { 
                id 
                userName
            }
            likeCount
        }
    }
`