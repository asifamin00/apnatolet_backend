const express = require('express')

const app = express()
const path= require('path')
const dotenv=require('dotenv')
const cors=require("cors")
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use((req,res, next)=>{
    console.log("http method-"+req.method + ",URL-"+req.url)
    next()
    })             

app.get('/', (req,res)=>{

    res.render('index.ejs')

})

PORTO=process.env.PORT

app.listen(PORTO,()=>{
    console.log("server started "+ PORTO + " and mongo_conneced")
})
