import React from 'react'
import { Box ,Flex ,Heading ,Text, Button } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
function Home() {
    const navigate=useNavigate()
  return (
    <Box  w={"800px"} p={"150px"} mt={"100px"} ml={"40px"}  fontFamily={"Roboto, sans-serif"}  >
    <Flex justifyContent={"center"} placeItems={"center"} gap={"10px"}>
      {/* <Box w={"100px"} h={"100px"} pt={"10px"} fontFamily={"Ubuntu, sans-serif"} backgroundColor={"teal"} color={"white"} borderRadius={"5px"} fontWeight={"600px"} fontSize={"5xl"} textAlign={"center"}>stay</Box> */}
    <Text   fontSize={'60px'} fontWeight={700}  display={"inline-block"} letterSpacing={"-2px"} transform={"scaleY(2)"} mr={"10px"} >STAY</Text>
    <Box  > <Heading  fontFamily={"Roboto, sans-serif"} fontSize={'48px'} fontWeight={"bold"}>Organized,</Heading>  <Heading fontFamily={"Roboto, sans-serif"} fontSize={'48px'} fontWeight={"bold"}>Productive...</Heading></Box>
    
    </Flex>
    
      
      {/* <Heading fontFamily={"Ubuntu, sans-serif"} fontSize={'5xl'} fontWeight={"light"}>Stay Organized, Stay Productive...</Heading> */}

     <Text ml={"40px"} mt={"10px"}  fontWeight={"semibold"} fontSize={"18px"}  >Transform your notes into your second brain – organize, capture, and think effortlessly. Start now!</Text>
     

     <Flex justifyContent={"left"} placeItems={"center"} ml={"40px"}  mt={"30px"}  >
     
      <Button colorScheme='black' variant='outline'  size={"lg"} fontWeight={"extrabold"} mr={"30px"} onClick={()=>navigate("/login")}>Log in</Button>
      <Button  bg={"black"}  color={"white"}  size={"lg"} onClick={()=>navigate("/signup")}>Sign up</Button>
       {/* <Text  fontFamily={"Roboto, sans-serif"} ml={"10px"}   fontWeight={"normal"} >Don't have an account? <Text cursor={"pointer"} color={"blue"} textDecor={"underline"} onClick={()=>navigate("/signup")}> signup</Text></Text> */}
     </Flex>
   </Box>
  )
}

export default Home