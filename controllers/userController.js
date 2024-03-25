
const userModel = require("../models/userSch")
const bcrypt=require("bcrypt")
const { cache } = require("ejs")
const jwt = require("jsonwebtoken")

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
        req.flash('success_msg', 'successfully register.')
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
            return res.redirect('/login')
            //return res.status(404).json({message:"Üser not found"})

        }
       const matchPassword = await bcrypt.compare(password,existingUser.password)
            if(!matchPassword){
                req.flash('error_msg', 'password mismatch')
                return res.redirect('/login')
                //return res.json({message:"password mismatch"})
            }

            
            if(existingUser.status =="pending"){
                req.flash('error_msg', 'pendin approval')
                return res.redirect('/login')
                //return res.render('pending')
                //return res.status(400).json({message:"pendin approval"})
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
    req.flash('error_msg', 'something went wrong')
    return res.redirect('/login')
    //return res.status(500).json({message:"something went wrong"})

}
}

module.exports={signin,signup,dashbord}