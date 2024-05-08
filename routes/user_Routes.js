const express = require('express')
const userRouter = express.Router()
const { signup, signin, dashbord, forgotPassword, otp_check, createUser, edituser, delete_user, approve_user, newpropo } = require('../controllers/userController')
const auth = require('../middlewares/auth')
const fs = require('fs');
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const { forEachOf, forEach } = require('async');
const cloudinary = require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, cb) {
        const random = uuidv4()
        cb(null, random + "" + file.originalname)
    }
    // Sets saved filename(s) to be original filename(s)
})
const maxSize = { fileSize: 1000000 }
const photoFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
}
// Set saved storage options:
const upload = multer({ storage: storage, limits: maxSize, fileFilter: photoFilter })




userRouter.get('/login', (req, res) => {
    res.render('login')
})

userRouter.get('/pending', (req, res) => {
    res.render('pending')
})

userRouter.get('/register', (req, res) => {
    res.render('register')
})
userRouter.post('/creatuser', auth, createUser)


userRouter.put('/useredit/:id', auth, edituser);
userRouter.delete('/delete', auth, delete_user);
userRouter.put('/approving', auth, approve_user);


userRouter.get('/forgot-password', (req, res) => {
    res.render('forgot-password')
})

userRouter.get('/', auth, dashbord)

userRouter.post('/register', signup)

userRouter.post('/login', signin)

userRouter.get('/logout', (req, res) => {


    res.cookie("token", '', { maxAge: 1 });
    req.session.destroy();
    res.redirect('/');

})

userRouter.get('/otp', (req, res) => {
    res.render('otp')

})

userRouter.post('/forgot-password', forgotPassword);

userRouter.post('/otp', otp_check);

userRouter.post("/newprop", upload.array("files", 10),auth, newpropo);





module.exports = userRouter