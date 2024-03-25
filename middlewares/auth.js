const jwt=require("jsonwebtoken")
const SECRET_KEY=process.env.AUTH_SECRET


const auth = (req, res, next)=>{

    try {
        
        
        const token = req.cookies.token
        
        if(token ){
            
            let user = jwt.verify(token, SECRET_KEY)
            
            req.userId = user.id
            

        }
        else{
            res.redirect('/login')
           

        }

       next()




    } catch (error) {
        
        
        res.redirect('/login')
        
        
    }

}
module.exports = auth






   