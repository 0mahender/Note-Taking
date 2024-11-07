import React from 'react'
import {useNavigate} from "react-router-dom"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
 
  
} from '@chakra-ui/react';
function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] =React.useState('');
  const [userName,setUserName]=React.useState('')
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
   

  
    const payload={
      email,
      password,
    }
      fetch("http://localhost:3000/users/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      }).then(res=>res.json()).then((data)=>{localStorage.setItem("token",data.token);
        if(data.msg==="Loged In!"){
          navigate(`/user/${data.user.name}`)

        }
      }).catch(err=>console.log(err))
    
     setEmail("")
     setPassword("")
  };

  return (
    <Box
    maxW="md"
    ml={"200px"}
    mt={"250px"}
    p={6}
    borderRadius="md"
    boxShadow="md"
    fontFamily={"Roboto, sans-serif"} 
 
  >
    <Heading as="h2" size="lg" textAlign="center" mb={6}>
      Log In
    </Heading>
    <form onSubmit={(e)=>handleSubmit(e)}  >
      <Stack spacing={10}>
     

    

        <FormControl id="email" isRequired>
     
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            border={"none"}
            borderBottom={"1px solid blue"}
          />
        </FormControl>

        <FormControl id="password" isRequired>
        
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            border={"none"}
            borderBottom={"1px solid blue"}
          />
        </FormControl>
       
       

        <Button bg={"black"} sx={{_hover:{
            backgroundColor:"black",
            color:"red"
          }}}  color={"white"} type="submit">
          Login
        </Button>
      </Stack>
    </form>
  </Box>
 
  )
}

export default Login