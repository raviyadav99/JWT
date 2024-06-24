const mongoose = require("mongoose")
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

mongoose.connect("mongodb+srv://RaviDon:RaviDon@cluster0.ysuel.mongodb.net/")

const user = mongoose.model('Users',{username : String,email:String , password:String})

app.post("/signin",async(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const userExist = await user.findOne({username : username})
    if(userExist){
        return res.status(400).send("user already exist");
    }
    const User = new user({username : username , email : email , password : password})

    User.save()
    res.json("User created successfully")
})
app.listen(port)

