const express=require('express')
const{signup,signin,dashbord}=require('../controllers/userController')
const auth=require('../middlewares/auth')

const userRouter=express.Router()

userRouter.get('/login', (req,res)=>{
    res.render('login')})
userRouter.get('/register', (req,res)=>{
    res.render('register')
})
userRouter.get('/forgot-password', (req,res)=>{
    res.render('forgot-password')
})

userRouter.get('/',auth,dashbord)

userRouter.post('/register',signup)

userRouter.post('/login',signin)

module.exports=userRouter