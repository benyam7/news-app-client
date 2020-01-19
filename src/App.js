

import React from 'react';
import { BrowserRouter , Route} from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
// the order is so we can override the sematic-css in our app.css
import './App.css';

// pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

import SingleNews from './pages/SingleNews';

//components
import NavBar from './components/NavBar'
import AuthRoute from './components/AuthRoute'

//Context api thing
import  {AuthProvider}  from './context/AuthProvider'


function App() {
  return (
    <AuthProvider>

      
    <BrowserRouter>
        <NavBar />
        <Route exact path = '/' component = {Home}></Route>
        <Route exact path = "/news/:newsId" component = {SingleNews}/>
        <AuthRoute exact path = '/login' component = {Login}></AuthRoute>)
        <AuthRoute exact path = '/signup' component = {Signup}></AuthRoute>
          
    </BrowserRouter>
    </AuthProvider>
  ) 
  }

export default App;
