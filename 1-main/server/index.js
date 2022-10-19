const express = require("express")
const app = express()
const mongoose = require('mongoose')
const UserModel = require("./models/Users")

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://itcjha5541:rudy554135@cluster0.vr0ux5z.mongodb.net/?retryWrites=true&w=majority')    

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
    if (err) {
        res.json(err)
    } else {
        res.json(result)
    }
    })
})

app.post("/createUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json(user)
})

app.get('/', (req,res)=>{
    res.send('<h1>서비스 준비중입니다.</h1>')
})
app.get('/hello', (req,res)=>{
    res.json({message: 'Hello World!'})
})
app.listen(3001, ()=>{
    console.log('SERVER RUNS PERFECTLY!')
})

