const mongoose=require("mongoose")
const listSchema=mongoose.Schema({
listName:String,
userId:String,
user:String

},
{
    versionKey:false
}
)

const ListModel=mongoose.model("list",listSchema)

module.exports={
    ListModel
}