import React , {useContext}from 'react'
import { Grid , Transition} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserContext } from '../context/UserContext'
import NewsCard from '../components/NewsCard'
import PostNewsForm from '../components/PostNewsForm'


function Home() {
   const {user} = useContext(UserContext)
   let news = ''
    const {loading, data } = useQuery(GET_NEWS_QUERY);
    console.log(`Loading: ${loading}`)
    console.log(data)
    if(data){
      news = {data: data.getNews}
    }
    return (  
       
           <div className ={user ? '' : "headlines-container"} >

                <Grid column = {1}  style = {{marginLeft : 20}} >
                {
                user ? user.userName === 'admin' && (<Grid.Row>
                  <div className = "news-form-container">
                   <PostNewsForm />
                  </div>
                
                </Grid.Row>) : null}
                <Grid.Row >
                    <h3 className = "ui container" style = {{marginTop: 20, marginBottom: -10 , color: "2185D"}}>News</h3>
                </Grid.Row>

                <Grid.Row >

                    {  
                     news.loading ? (
                       <h1>loading ...</h1>
                     )
                     :

                     <Transition.Group>
                       {
                           news.data &&   news.data.map((n) => 
                           (

                           <Grid.Row key = {n.key} className = "ui container">
                               <NewsCard news = { n } />
                           </Grid.Row>)

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
    
  }
    }

`

export default Home