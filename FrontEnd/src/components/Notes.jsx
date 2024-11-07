import {Box,Text, Textarea,Button} from "@chakra-ui/react"
import React from 'react'

const Notes = ({listName,list_id}) => {
  const [content,setContent]=React.useState("")
  const [data,setData]=React.useState([])
  const [Fdata,setFData]=React.useState([])


  const handleClick=()=>{
    console.log(list_id)
    const payload={
      context:content,
      noteID:list_id
    }

 

    fetch(`http://localhost:3000/listItems/create`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
        body:JSON.stringify(payload)
    }).then((res=>res.json())).then((res)=>{console.log("Note Created!")}).catch((err)=>console.log(err))
  }

   const fetchData=()=>{
    setFData([  ])
    fetch(`http://localhost:3000/listItems`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    }).then(res=>res.json()).then((res)=>setData(res.msg)).catch((err)=>console.log(err))
   }

   const filterData=()=>{
    const FilterData=data.filter((item)=>item.noteID===list_id)
    console.log("data",data)
    console.log("filterd Data",FilterData)
    console.log(list_id)
    setFData([FilterData[0]])
   }
 
  

  React.useEffect(()=>{
    fetchData()
    filterData()
  },[list_id])
   
  return (
    <Box>
     {/* {Fdata.noteID!==list_id? <Box w={"800px"} borderRadius={"5px"}  h={"600px"} mt={"120px"} ml={"4px"} bg={"#FFFBEB"} textAlign={"center"} paddingTop={"200px"}  >
<Text  fontFamily= {"Playwrite GB S, cursive"}  fontOopticalSsizing={"auto"} color={"Gainsboro"} fontSize={"7xl"} >  Note Here</Text>
    
       
       </Box> : */}
       <Box w={"800px"} borderRadius={"5px"}  h={"600px"} mt={"120px"} ml={"4px"} bg={"#FFFBEB"}  >
        <Text textAlign={"center"} height={"100px"} borderBottom={"0.5px solid Black"} boxShadow={"rgba(33, 35, 38, 0.1) 0px 10px 10px -10px"} fontSize={"4xl"} fontWeight={"semibold"} pt={"15px"} mx={"15px"}>{listName}</Text>
        <Box>
         <Textarea  border={"1px solid red"}  onChange={(e)=>setContent(e.target.value)} height={"410px"} resize={"none"} m={"30px"} autoFocus w={"90%"}_focus={{border:"none",boxShadow:"none"}}>
       
          </Textarea>
      
         
          <Button onClick={handleClick} position={"absolute"} top={"42rem"} right={"23rem"}>save </Button>
        </Box>
   </Box>
{/* }  */}
    </Box>
   
  )
}

export default Notes







