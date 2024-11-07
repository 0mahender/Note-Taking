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

import {useNavigate} from 'react-router-dom'
import { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [photo, setPhoto] = useState("");
  const [passCheck,setPassCheck]=useState(false)
 
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(password===conformPassword){
      setPassCheck(false)
    const payload={
      name,
      phone,
      email,
      password,
      photo

    }



      fetch("http://localhost:3000/users/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      }).then(res=>res.json()).then(data=>console.log("registerd data",data)).catch(err=>console.log(err))
     setName("")
     setEmail("")
     setPassword("")
     setPhone("")
     setConformPassword("")

     navigate("/login")

    }
    else{
      setPassCheck(true)
      setConformPassword("")
    }
  
  

  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0].name);
    
  };

  return (
    <Box
      maxW="md"
      ml={"170px"}
      mt={"100px"}
      p={6}
      borderRadius="md"
      boxShadow="md"
      fontFamily={"Roboto, sans-serif"} 
    //  bg="rgba(0, 0, 0, 0.5)"
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit} >
        <Stack spacing={10}>
          <FormControl id="name" isRequired>
            {/* <FormLabel>Name</FormLabel> */}
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              border={"none"}
              borderBottom={"1px solid blue"}
            />
          </FormControl>

          <FormControl id="phone" isRequired>
            {/* <FormLabel>Phone Number</FormLabel> */}
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              border={"none"}
              borderBottom={"1px solid blue"}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            {/* <FormLabel>Email</FormLabel> */}
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
            {/* <FormLabel>Password</FormLabel> */}
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              border={"none"}
              borderBottom={"1px solid blue"}
            />
          </FormControl>
         
          <FormControl id="conformPassword" isRequired>
            {/* <FormLabel>Conform Password</FormLabel> */}
            <Input
              type="password"
              placeholder= {passCheck?"Both passwords not matched!":"Re-enter password"}
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              border={"none"}
              borderBottom={passCheck?"1px solid red":"1px solid blue"}
            />
          </FormControl>

          <FormControl id="photo" isRequired>
            {/* <FormLabel>Photo</FormLabel> */}
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              border={"none"}
              borderBottom={"1px solid blue"}
            />
          </FormControl>

          <Button bg={"black"}  color={"white"} sx={{_hover:{
            backgroundColor:"black",
            color:"red"
          }}} type="submit">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default Signup;
