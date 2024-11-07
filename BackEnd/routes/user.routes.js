const express=require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
     const {name,email,password,phone,photo}=req.body
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.json({error:err.message})
            } else {
                const user=new UserModel({name,email,phone,password:hash,photo})
                await user.save()
            }
        })
        res.json({msg:"User has been registerd",user:req.body})
    } catch (error) {
        res.json({msg:"askdgh",err:error.message})
    }
    
})
userRouter.post("/login",async(req,res)=>{
     const {email,password}=req.body
     try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userId:user._id,user:user.name},"jerry")
                    res.json({msg:"Loged In!",token,user:user})
                }
                else{
                    res.json({msg:"Invalid Password!"})
                }
            })
        }
        else{
            res.json({msg:"User does not exist"})
        }
     } catch (error) {
        res.json({msg:error.message})
     }
})

module.exports={
    userRouter
}