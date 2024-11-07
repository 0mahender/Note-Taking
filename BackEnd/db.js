const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://mahenderlokini:QdoeDNWGU4oFuWg0@task-db.rtt0x.mongodb.net/?retryWrites=true&w=majority&appName=Task-DB",)


module.exports={
    connection
}