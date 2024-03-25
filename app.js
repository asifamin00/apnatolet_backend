const express = require('express')
const app = express()
const path= require('path')
const dotenv=require('dotenv')
const methodOverride = require('method-override')
const session = require('express-session')
const cors=require("cors")
const bodyparser = require('body-parser')
const flash = require('connect-flash');
const cookieParser = require('cookie-parser')
dotenv.config()
const UserRouter=require('./routes/user_Routes')


//db connection
const mongoose = require('mongoose')


//middleware for  method override
app.use(methodOverride('_method'));

//middleware for express session
app.use(session({
    secret : process.env.SESSION_SEC,
    resave : true,
    saveUninitialized:true
}));

app.use(flash());


//middlewares
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error_msg'));
    
    next();
});

app.use('/',UserRouter)




app.use((req,res, next)=>{
    console.log("http method-"+req.method + ",URL-"+req.url)
    next()
})

    



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    const PORTO=process.env.PORT
    
    app.listen(PORTO,()=>{
        console.log("server started "+ PORTO + " and mongo_conneced")
        
        })
})
.catch((error)=>{
console.log(error+'ll55')
})
