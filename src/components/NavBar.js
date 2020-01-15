import React, { useState, useContext } from 'react'
import { Grid,Input,  Menu, Label, Icon } from 'semantic-ui-react'
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
    <div className = "ui container">
      
      <Menu secondary >
  
      <Menu.Item
         
           as = {Link} to = '/'
           
        >
        
       
    
          
    <Label  image color = "blue" circular icon>
          <Icon name = "home" style = {{paddingLeft: 2}} />
          Home
    </Label>
     
            
           </Menu.Item>
        
        <Menu.Item>
    
<Label as='a' image color = "blue" circular>
      <img src={'https://semantic-ui.com/images/avatar/small/elliot.jpg'} alt = "user avatar" />
      {context.user.userName}
    </Label>
        </Menu.Item>

      
        <Menu.Menu position='right'>  
          <Menu.Item  >
            <Input placeholder='Search...' color = "blue" />
                <Icon name = 'search' color = "blue" style = {{marginLeft: -27}}/>
          
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={context.logout}
            as = {Link}
            to = "/login"
           
          >
            <Label  image color = "blue" circular icon>
          <Icon name = "log out" style = {{paddingLeft: 2}} />
          Log out
    </Label>
          </Menu.Item>

        </Menu.Menu>
      </Menu>



    </div>
  ) 
  :
   
  (
    <div className = "ui container">
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