
const userModel = require("../models/userSch")
const bcrypt=require("bcrypt")
const { cache } = require("ejs")
const jwt = require("jsonwebtoken")

const SECRET_KEY=process.env.AUTH_SECRET


const dashbord=(req,res )=>{

    
res.render('index')
}


const signup=async(req,res)=>{

    
    
    const {first_name,last_name,email,phone,password}=req.body
    try {
        const existingUser= await userModel.findOne({email:email})
        if(existingUser){
            return res.status(400).json({message:"Üser alredy exists"})

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

        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY)
    
        return res.status(200).json({user:result,token:token})

       



    } catch (error) {

        console.log(error + 'asif49')
        return res.status(500).json({message:"Something went wrong"})
        
    }

}

const signin = async (req,res)=>{
    
    const {email,password}=req.body
    try {
        const existingUser= await userModel.findOne({email:email})
        if(!existingUser){
            return res.status(404).json({message:"Üser not found"})

        }
       const matchPassword = await bcrypt.compare(password,existingUser.password)
            if(!matchPassword){
                return res.status(400).json({message:"password mismatch"})
            }

             const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY)
             res.status(200)
            
            // res.cookie("token", token)
                //,roll:existingUser.roll
            //const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h" });
                //.json({user:existingUser.username,email:existingUser.email})
            res.cookie("token", token);
            
            return res.redirect("/");


}
catch(error){
    console.log(error + '84')
    return res.status(500).json({message:"something went wrong"})

}
}

module.exports={signin,signup,dashbord}