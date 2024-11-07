const mongoose=require("mongoose")

const ListItemSchema=mongoose.Schema({

    context:String,
    noteID:String
},
{
    versioKey:false
})

const ListItemModel=mongoose.model("listitems",ListItemSchema)

module.exports={
    ListItemModel
}