const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.AUTH_SECRET
const Is_admin_auth = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (token) {

            let user = jwt.verify(token, SECRET_KEY)

            req.userId = user.id
            req.role = user.role
            if(user.role !=2017)
                {req.flash('error_msg', 'User not allowed')
            res.redirect('/dashbord')
        
           return
        
        
        }
        }
        else {
            res.redirect('/login')
        }

        next()

    } catch (error) {
        res.redirect('/login')
    }

}
module.exports = Is_admin_auth






