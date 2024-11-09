
import {Box ,Image ,Heading,Text,Flex,Button} from '@chakra-ui/react'
// import '@fontsource/ubuntu';
import './App.css'
import React from "react"
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import UserPage from './components/UserPage'
function App() {
 


const handleSet=()=>{

}

  return (
    
     
     <Box 
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/flat-lay-desktop-concept-with-copy-space_23-2148226868.jpg?t=st=1729428033~exp=1729431633~hmac=703d7c391b7c9a22c35ff4f6660aa3b786a6280bbe8d067fbb5cca31580de5a7&w=2000")`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        width: '100%', 
       height:"880px",
        border:"0.5px solid white"
      }}
    >
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user/:username" element={<UserPage/>}/>
      </Routes>
       
      
     
    </Box>

     
    
  )
}

export default App
