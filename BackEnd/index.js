const express=require("express")
const {connection}=require("./db") 
const {userRouter}=require("./routes/user.routes")
const {listRoutes}=require("./routes/list.routes")
const { listItemRoutes } = require("./routes/listitem.routes")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/lists",listRoutes)
// app.use("/listItems",listItemRoutes)
app.listen(3000,async()=>{
   try {
    await connection
    console.log("Connected to the DB")
   } catch (error) {
    console.log(error)
    console.log("smothing went wrong")

   }
})