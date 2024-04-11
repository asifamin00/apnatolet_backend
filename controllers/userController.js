
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')
const userModel = require("../models/userSch")
const bcrypt = require("bcrypt")
const { cache } = require("ejs")
const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.AUTH_SECRET


const dashbord = async (req, res) => {
    try {
        let token = req.cookies.token
        if (token) {

            let user = jwt.verify(token, SECRET_KEY)

            let existingUser = await userModel.findOne({ email: user.email })


            res.render('index', { existingUser })
        }
    } catch (error) {
        console.log(error)
    }
}


const signup = async (req, res) => {



    const { first_name, last_name, email, phone, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            req.flash('error_msg', 'Üser alredy exists')
            return res.redirect('/register')

        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await userModel.create({
            userFname: first_name,
            userLname: last_name,
            Phone: phone,
            email: email,
            password: hashedPassword,
            Roll: 9012,
            status: "pending",
            createdBy: 'self'
        })

        const token = jwt.sign({ email: result.email, id: result._id, status: result.status }, SECRET_KEY)
        req.flash('success_msg', 'Successfully register.')
        return res.redirect('/register')






    } catch (error) {

        console.log(error + 'asif49')
        req.flash('error_msg', error)
        return res.redirect('/register')


    }

}

const signin = async (req, res) => {
    //const res.locals.user = null;
    const { email, password } = req.body
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser) {
            req.flash('error_msg', 'Üser not found')
            req.flash('e_email', email)
            return res.redirect('/login')
            //return res.status(404).json({message:"Üser not found"})

        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            req.flash('error_msg', 'Password mismatch')
            return res.redirect('/login')

        }


        if (existingUser.status == "pending") {
            req.flash('error_msg', 'Pending approval')
            return res.redirect('/login')

        }


        const token = jwt.sign(
            {
                email: existingUser.email, id: existingUser._id, status: existingUser.status
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
        res.cookie("token", token, options);

        res.redirect("/");



    }
    catch (error) {
        console.log(error + '84')
        req.flash('error_msg', 'Something went wrong')
        return res.redirect('/login')


    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body

    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
        req.flash('error_msg', 'Üser not found')
        return res.redirect('/forgot-password')
    }
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.G_MAIL,
            pass: process.env.G_PASS
        }
    })
    const dateObj = new Date();
    const localDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

    const mailOptions = {
        from: process.env.G_MAIL,
        to: email,
        subject: 'OTP FOR RESETPASSWORD',
       html: `<!DOCTYPE html>
       <html lang="en">
         <head>
           <meta charset="UTF-8" />
           <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           <meta http-equiv="X-UA-Compatible" content="ie=edge" />
           <title></title>
       
           <link
             href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
             rel="stylesheet"
           />
         </head>
         <body
           style="
             margin: 0;
             font-family: 'Poppins', sans-serif;
             background: #ffffff;
             font-size: 14px;
           "
         >
           <div
             style="
               max-width: 680px;
               margin: 0 auto;
               padding: 45px 30px 60px;
               background: #f4f7ff;
               background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
               background-repeat: no-repeat;
               background-size: 800px 452px;
               background-position: top center;
               font-size: 14px;
               color: #434343;
             "
           >
             <header>
               <table style="width: 100%;">
                 <tbody>
                   <tr style="height: 0;">
                     <td>
                       <img
                         alt=""
                         src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo"
                         height="30px"
                       />
                     </td>
                     <td style="text-align: right;">
                       <span
                         style="font-size: 16px; line-height: 30px; color: #ffffff;"
                         >${localDate}</span
                       >
                     </td>
                   </tr>
                 </tbody>
               </table>
             </header>
       
             <main>
               <div
                 style="
                   margin: 0;
                   margin-top: 70px;
                   padding: 92px 30px 115px;
                   background: #ffffff;
                   border-radius: 30px;
                   text-align: center;
                 "
               >
                 <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                   <h1
                     style="
                       margin: 0;
                       font-size: 24px;
                       font-weight: 500;
                       color: #1f1f1f;
                     "
                   >
                     Your OTP
                   </h1>
                   <p
                     style="
                       margin: 0;
                       margin-top: 17px;
                       font-size: 16px;
                       font-weight: 500;
                     "
                   >
                    Hey ${existingUser.userFname},
                   </p>
                   <p
                     style="
                       margin: 0;
                       margin-top: 17px;
                       font-weight: 500;
                       letter-spacing: 0.56px;
                     "
                   >
                     Thank you for choosing apnatolet. Use the following OTP
                     to complete the procedure to change your password. OTP is
                     valid for
                     <span style="font-weight: 600; color: #1f1f1f;">30 minutes</span>.
                     Do not share this code with others, including apnatolet
                     employees.
                   </p>
                   <p
                     style="
                       margin: 0;
                       margin-top: 60px;
                       font-size: 40px;
                       font-weight: 600;
                       letter-spacing: 25px;
                       color: #ba3d4f;
                     "
                   >
                     ${otp}
                   </p>
                 </div>
               </div>
       
               <p
                 style="
                   max-width: 400px;
                   margin: 0 auto;
                   margin-top: 90px;
                   text-align: center;
                   font-weight: 500;
                   color: #8c8c8c;
                 "
               >
                 Need help? Ask at
                 <a
                   href="mailto:archisketch@gmail.com"
                   style="color: #499fb6; text-decoration: none;"
                   >apnatolet00@gmail.com</a
                 >
                 or visit our
                 <a
                   href=""
                   target="_blank"
                   style="color: #499fb6; text-decoration: none;"
                   >Help Center</a
                 >
               </p>
             </main>
       
             <footer
               style="
                 width: 100%;
                 max-width: 490px;
                 margin: 20px auto 0;
                 text-align: center;
                 border-top: 1px solid #e6ebf1;
               "
             >
               <p
                 style="
                   margin: 0;
                   margin-top: 40px;
                   font-size: 16px;
                   font-weight: 600;
                   color: #434343;
                 "
               >
                 apnatolet
               </p>
               <p style="margin: 0; margin-top: 8px; color: #434343;">
                 Address 540, City, State.
               </p>
               <div style="margin: 0; margin-top: 16px;">
                 <a href="" target="_blank" style="display: inline-block;">
                   <img
                     width="36px"
                     alt="Facebook"
                     src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                   />
                 </a>
                 <a
                   href=""
                   target="_blank"
                   style="display: inline-block; margin-left: 8px;"
                 >
                   <img
                     width="36px"
                     alt="Instagram"
                     src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
                 /></a>
                 <a
                   href=""
                   target="_blank"
                   style="display: inline-block; margin-left: 8px;"
                 >
                   <img
                     width="36px"
                     alt="Twitter"
                     src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                   />
                 </a>
                 <a
                   href=""
                   target="_blank"
                   style="display: inline-block; margin-left: 8px;"
                 >
                   <img
                     width="36px"
                     alt="Youtube"
                     src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
                 /></a>
               </div>
               <p style="margin: 0; margin-top: 16px; color: #434343;">
                 Copyright © 2024 Company. All rights reserved.
               </p>
             </footer>
           </div>
         </body>
       </html>
       `
    }

    transporter.sendMail(mailOptions, function (error, info) {
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
    res.redirect('otp')






}


const otp_check = async (req, res) => {
    const { _otp, password, confirm_password } = req.body

    var user_s = await userModel.findOne({ resetPasswordToken: _otp, resetPasswordExpires: { $gt: Date.now() } })

    if (user_s == null) {
        req.flash('error_msg', 'OTP incurect!');
        return res.redirect('/otp');
    }




    if (user_s.status == "pending") {
        req.flash('error_msg', 'You are not active user ,status pending!');
        return res.redirect('/otp');
    }

    if (!user_s.Roll == 2017 && 9012) {
        req.flash('error_msg', 'This is admin penal other not allowwd ');
        res.redirect('/otp');
    }


    if (password !== confirm_password) {
        req.flash('error_msg', "Password don't match.");
        return res.redirect('/otp');
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    user_s.resetPasswordToken = ''
    user_s.resetPasswordExpires = ''
    user_s.password = hashedPassword
    user_s.save()
    req.flash('success_msg', 'Password successfully changed')
    return res.redirect('/login')


}

module.exports = { signin, signup, dashbord, forgotPassword, otp_check }