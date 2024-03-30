
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const userModel = require("../models/userSch")
const bcrypt=require("bcrypt")
const { cache } = require("ejs")
const jwt = require("jsonwebtoken")
//const User =require(./)
const SECRET_KEY=process.env.AUTH_SECRET


const dashbord=async(req,res )=>{
    try {
        let token = req.cookies.token
        if(token){
            //let token = req.cookies.token
            let user = jwt.verify(token, SECRET_KEY)
            
            let existingUser=await userModel.findOne({email:user.email})
            
            
            res.render('index',{existingUser})
        }
    } catch (error) {
        console.log(error)
    }
}


const signup=async(req,res)=>{

    
    
    const {first_name,last_name,email,phone,password}=req.body
    try {
        const existingUser= await userModel.findOne({email:email})
        if(existingUser){
            req.flash('error_msg', 'Üser alredy exists')
            return res.redirect('/register')//res.status(400).json({message:"Üser alredy exists"})

        }

        const hashedPassword = await bcrypt.hash(password,10)

        const result = await userModel.create({
            userFname:first_name,
            userLname:last_name,
            Phone:phone,
            email:email,
            password:hashedPassword,
            Roll:9012,
            status:"pending",
            createdBy:'self'
        })

        const token = jwt.sign({email:result.email,id:result._id,status:result.status},SECRET_KEY)
        req.flash('success_msg', 'Successfully register.')
        return res.redirect('/register')
        //return res.status(200).json({user:result,token:token})

       



    } catch (error) {

        console.log(error + 'asif49')
        req.flash('error_msg', error)
        return res.redirect('/register')
       // return res.status(500).json({message:"Something went wrong"})
        
    }

}

const signin = async (req,res)=>{
    //const res.locals.user = null;
    const {email,password}=req.body
    try {
        const existingUser= await userModel.findOne({email:email})
        if(!existingUser){
            req.flash('error_msg', 'Üser not found')
            req.flash('e_email',email)
            return res.redirect('/login')
            //return res.status(404).json({message:"Üser not found"})

        }
       const matchPassword = await bcrypt.compare(password,existingUser.password)
            if(!matchPassword){
                req.flash('error_msg', 'Password mismatch')
                return res.redirect('/login')
                //return res.json({message:"password mismatch"})
            }

            
            if(existingUser.status =="pending"){
                req.flash('error_msg', 'Pendin approval')
                return res.redirect('/login')
               
            }

            
            const token = jwt.sign(
                {
                    email:existingUser.email,id:existingUser._id,status:existingUser.status
                },
                SECRET_KEY,
                {
                  expiresIn: process.env.TOKEN_EXP,
                }
              );
              const options = {
                expires: new Date(Date.now() + 86400000),
              };
           
            res.locals.user_i = existingUser.email;
            res.cookie("token", token,options);
            
              res.redirect("/");
            


}
catch(error){
    console.log(error + '84')
    req.flash('error_msg', 'Something went wrong')
    return res.redirect('/login')
    

}
}

const forgotPassword=async (req,res)=>{
    const {email}=req.body
   
        const existingUser= await userModel.findOne({email:email})
        if(!existingUser){
            req.flash('error_msg', 'Üser not found')            
            return res.redirect('/forgot-password')
        }
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false,
             specialChars: false 
           })
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.G_MAIL,
              pass: process.env.G_PASS
            }
          })

        const mailOptions = {
        from:process.env.G_MAIL,
        to: email,
        subject: 'OTP FOR RESETPASSWORD',
        text:'Your OTP is for apnaTolet is:\t'+ otp 
        }

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })


          existingUser.resetPasswordToken = otp;
          existingUser.resetPasswordExpires = Date.now() + 1800000; //   1/2 hours

          existingUser.save(otp)
          req.flash('success_msg', 'Please cheek email FOR OTP')
          console.log(otp)//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          res.redirect('otp')
        


          
         
        
}


const otp_check=async (req,res)=>  {
    const {_otp,password,confirm_password}=req.body
    
    var user_s= await userModel.findOne({resetPasswordToken: _otp, resetPasswordExpires : {$gt : Date.now() } })//userModel.findOne({resetPasswordToken:_otp,email:email})

    if(user_s == null)
    {
        req.flash('error_msg', 'OTP incurect!');
             return  res.redirect('/otp');
    }

   

     
     if(user_s.status == "pending"){
        req.flash('error_msg', 'You are not active user ,status pending!');
        return  res.redirect('/otp');
     }

     if(!user_s.Roll == 2017 && 9012 ){
        req.flash('error_msg', 'This is admin penal other not allowwd ');
        res.redirect('/otp');
     }
    

     if(password !== confirm_password) {
        req.flash('error_msg', "Password don't match.");
        return res.redirect('/otp');
    }
   
    
    const hashedPassword = await bcrypt.hash(password,10)

    user_s.resetPasswordToken=''
    user_s.resetPasswordExpires=''
    user_s.password=hashedPassword
      user_s.save()
      req.flash('success_msg', 'Password successfully changed')
     return res.redirect('/login')

     
    
     

     

     
    



}

module.exports={signin,signup,dashbord,forgotPassword,otp_check}