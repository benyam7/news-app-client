import React , {useContext}from 'react'
import { Grid , Transition, Loader, Header, Icon} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserContext } from '../context/UserContext'
import NewsCard from '../components/NewsCard'
import PostNewsForm from '../components/PostNewsForm'


function Home() {
   const {user} = useContext(UserContext)
   let news = ''
    const {loading, data } = useQuery(GET_NEWS_QUERY);
    
    if(data){
      news = {data: data.getNews}
    }
    return (  
       
           <div className ={user ? '' : "headlines-container"} >
                <Grid column = {1}  style = {{marginLeft : 20}} >
                {
                user ? user.userName === 'admin' && 
                (
                    <Grid.Row style = {{top:100,left: 450}}>
                      <PostNewsForm />
                    </Grid.Row>
                
                ) : null}
               
                <Grid.Row >
               { !user && (<Header as='h2' icon textAlign='center' >
      <Icon name='newspaper alternate'  />
      <Header.Content>News Headlines</Header.Content>
    </Header>)}
                </Grid.Row>
                <Grid.Row className = "news-car-list" >
                    {  
                     loading ? (
                      <Loader active inline='centered' size = 'tiny'   style = {{top: user &&250}} />
                              )
                              :
                     <Transition.Group>
                       {
                           news.data &&   news.data.map((n) => 
                           (
                           <Grid.Row key = {n.key} className = "ui container">
                               <NewsCard news = { n } />
                           </Grid.Row>
                           )
                       ) 
                           }
                     </Transition.Group>
                    }
                </Grid.Row>
            </Grid>
           </div> 
    )
}


const GET_NEWS_QUERY = gql`
   {
        getNews {
    title
    body
    id
    userName
    createdAt
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
    newsPhotoUrl
    author
    newsUrl
  }
    }

`

export default Home