const express = require('express')
const path= require('path')
const server = express()
const dotenv=require('dotenv')
const cors=require("cors")
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()


server.get('/', (req,res)=>{

    res.send('hello')

})

PORTO=process.env.PORT

server.listen(PORTO,()=>{
    console.log("server started "+ PORTO + " and mongo_conneced")
})