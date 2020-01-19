import React, { useState, useContext } from 'react'
import { Grid,Input, Image, Header, Segment, Menu, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



// Context
import {UserContext} from '../context/UserContext'

const NavBar = () => {

  const context =  useContext(UserContext)
  
  const pathname = window.location.pathname;
  
  const path = pathname === '/' ? 'headlines' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = ( e, { name }) => setActiveItem(name)
    
  
  const navBar = context.user ? (

    <div className = "ui container fixed-menu">
 
  
    {/* <Header as='h2' icon textAlign='center' attached = "top" >
      <Icon name='newspaper alternate' style={{fontSize: 40, color: '#704847'}} />
      <Header.Content>News Headlines</Header.Content>
    </Header> */}
    <Segment >
      <div className = 'news-nav-bar'>
      <Header as='h2' icon textAlign='center' style = {{top: '2%'}}>
      <Icon name='newspaper alternate' style={{fontSize: 40, color: '#704847'}} />
      <Header.Content>News Headlines</Header.Content>
    </Header>
      </div>
    
    <Menu  secondary  fluid>
  
  <Menu.Item
    >
      
<Label className = "user-menu" 
      as = {Link} to = '/'
      onClick = {() => {
        window.scrollTo(5,5);
      }}>
      <Icon name = "home"  style = {{paddingLeft  : 5}}/>
      Home
</Label>
 
       </Menu.Item>
    
    <Menu.Item>

<Label as={Link} to = '/' className = "user-menu" >
  <Image
          circular
          avatar
          size='mini'
          src = 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'
          style = {{marginRight: 10}}
        />
  {context.user.userName}
</Label>
    </Menu.Item>
    <Menu.Menu position='right'>  
      <Menu.Item  >
        <Input placeholder='Search news...'  />
            <Icon name = 'search'  style = {{marginLeft: -27, color :'#704847'}}/>
      </Menu.Item>
      <Menu.Item
        name='logout'
        active={activeItem === 'logout'}
        onClick={context.logout}
        
       
      >
        <Label as = {Link}
        to = "/login" className = "user-menu menu-log-out " >
      <Icon name = "log out" style = {{paddingLeft: 2}} />
      Log out
</Label>
      </Menu.Item>

    </Menu.Menu>

  </Menu>
    </Segment>
  </div>
 
  ) 
  :
   
  (
    <div className = "ui container fixed-menu-no-user">
    <Grid>    
      <Grid.Column width={4}>
        <Menu fluid vertical tabular size = "large" color = "teal">
          <Menu.Item
            name='headlines'
            active={activeItem === 'headlines'}
            onClick={handleItemClick}
            // make it behave as link and give it the path
            as = {Link}
            to = "/"
          />
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}

            as = {Link}
            to = "/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}

            as = {Link}
            to = "/signup"
          />
          </Menu>
       
      </Grid.Column>
      
    </Grid>



    </div>
  )
          return navBar;
  }

export default NavBar