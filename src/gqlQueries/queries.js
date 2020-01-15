import gql from 'graphql-tag'

export const GET_NEWS_QUERY  = gql`
{
     getNews {
 title
 body
 id
 userName
 comments{
   id
   createdAt
   userName
   body
 }
 
 likes{
   userName
 }
 likeCount
 commentCount
 
 
}
 }

`