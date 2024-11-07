const exprees=require("express")
const {ListItemModel}=require("../models/listitem.model")
const listItemRoutes=exprees.Router()

listItemRoutes.post("/create",async(req,res)=>{

    try {
        const context= ListItemModel(req.body)
        await context.save()
        res.json({msg:"New item added"})
    } catch (error) {
        res.json({err:error.message})
    }

})
listItemRoutes.get("/",async(req,res)=>{
    
    // const {note_ID}=req.body.noteID

    try {
        const content= await ListItemModel.find()
        res.json({msg:content})
    } catch (error) {
        res.json({err:error.message})
    }
        
})
listItemRoutes.patch("/update/:listItemID",async(req,res)=>{

})

listItemRoutes.delete("/delete/:listItemID",async(req,res)=>{

})

module.exports={
    listItemRoutes
}