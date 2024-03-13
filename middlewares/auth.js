const jwt=require("jsonwebtoken")
const SECRET_KEY=process.env.AUTH_SECRET
//const cookieParser = require('cookie-parser')

const auth = (req, res, next)=>{

    try {
        
        //let token = req.headers.authorization
        const token = req.cookies.token
        console.log(token)
        if(token){
            //token = token.split(" ")[1]
            let user = jwt.verify(token, SECRET_KEY)
            console.log(user)
            req.userId = user.id
        }
        else{
            res.redirect('/login')
           // res.redirect('/login') return res.status(401).json({message:"Unauthorized-w User"})

        }

       next()




    } catch (error) {
        console.log(error +'29')
        
        res.redirect('/login')
        //res.status(401).json({message:"Unauthorized-z User"})
        
    }

}
module.exports = auth






   