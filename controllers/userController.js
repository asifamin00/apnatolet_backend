

const nodemailer = require('nodemailer')
const userModel = require("../models/userSch")
const propModel = require("../models/propertySchema")
const counterModel = require("../models/counterSch")
//const helper = require('../user_prop');
const emailTemp = require('../emailtemplet')
const moment = require('moment')
const fs = require('fs');
const bcrypt = require("bcryptjs")
const { cache } = require("ejs")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const { myFunc } = require('../user_prop')
const { reduceRight, tryEach } = require('async')
const { isNull } = require('util')
const { isArrayBuffer } = require('util/types')
const { log } = require('console')
const cloudinary = require("cloudinary").v2
const sgMail = require('@sendgrid/mail')




const SECRET_KEY = process.env.AUTH_SECRET


const dashbord = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {

      let user = jwt.verify(token, SECRET_KEY)

      let existingUser = await userModel.findOne({ email: user.email })

      let alluser = await userModel.find({})
      let allprop = await propModel.find({})
      let pending_count = await userModel.find({ status: "pending" }).countDocuments()
      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()
      let allprop_Live = await propModel.find({ live: "off" }).countDocuments()
      let allprop_Hold = await propModel.find({ status: "Hold" }).countDocuments()
      let owner_count = await userModel.find({ role: 1298 }).countDocuments()
      let user_count = await userModel.find({ role: 1714 }).countDocuments()
      let agent_count = await userModel.find({ role: 2346 }).countDocuments()




      res.render('dashbord', { existingUser, alluser, pending_count, allprop, allprop_pending, allprop_Live, allprop_Hold, owner_count, user_count, agent_count })




    }
  } catch (error) {
    console.log(error)
  }
}

const user_con = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {

      let user = jwt.verify(token, SECRET_KEY)

      let existingUser = await userModel.findOne({ email: user.email })

      let alluser = await userModel.find({})
      let allprop = await propModel.find({})

      let pending_count = await userModel.find({ status: "pending" }).countDocuments()
      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()



      res.render('user_con', { existingUser, alluser, pending_count, allprop, allprop_pending })

    }
  } catch (error) {
    console.log(error)
  }
}




const prop_con = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {

      let user = jwt.verify(token, SECRET_KEY)

      let existingUser = await userModel.findOne({ email: user.email })
      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()
      let alluser = await userModel.find({})



      const prop_table_pipeline = [
        {
          $lookup: {
            from: 'usersches',           // The collection to join
            localField: 'user_id',   // Field from the orders collection
            foreignField: '_id',         // Field from the customers collection
            as: 'propt_info'          // Alias for the joined data
          }

        },

        {
          $addFields: {
            users: { $first: "$propt_info" },
          }
        },
        {
          $unwind: "$propt_info"       // Flatten the array to work with individual documents
        },


        {
          $project: {
            "atlprop_id": 1,
            "image": 1,
            "prop_kind": 1,
            "Bedrooms": 1,
            "prop_type": 1,
            "rent": 1,
            "users.Phone": 1,
            "approved_by": 1,
            "status": 1,
            "live": 1

          }
        },
        {
          $sort: { "atlprop_id": -1 }
        }

      ]
      const allprop = await propModel.aggregate(prop_table_pipeline)




      let pending_count = await userModel.find({ status: "pending" }).countDocuments()

      res.render('prop_con', { existingUser, alluser, pending_count, allprop, allprop_pending })
    }
  } catch (error) {
    console.log(error)
  }
}

const new_prop_ent = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {

      let user = jwt.verify(token, SECRET_KEY)

      let existingUser = await userModel.findOne({ email: user.email })
      const user_id = req.params.id

      let alluser = await userModel.find({})
      let allprop_user = await propModel.find({ user_id: user_id })
      let username = await userModel.findOne({ _id: user_id })

      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()
      let pending_count = await userModel.find({ status: "pending" }).countDocuments()

      res.render('new_prop_ent', { existingUser, alluser, pending_count, allprop_user, username, allprop_pending })

    }
  } catch (error) {
    console.log(error)
  }
}
const selectuser = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {
      let user = jwt.verify(token, SECRET_KEY)
      let existingUser = await userModel.findOne({ email: user.email })
      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()
      let pending_count = await userModel.find({ status: "pending" }).countDocuments()
      res.render('selectuser', { existingUser, pending_count, allprop_pending, allprop_user: '' })
    }
  } catch (error) {
    console.log(error)

  }
}
const selectuser_result = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {
      let user = jwt.verify(token, SECRET_KEY)
      let existingUser = await userModel.findOne({ email: user.email })
      let allprop_pending = await propModel.find({status: "pending"}).countDocuments()
      let pending_count = await userModel.find({ status: "pending" }).countDocuments()


      let email_id = req.query.email_id
      let Phone_no= req.query.Phone_no

     if(email_id || Phone_no ){
      let alluser = await userModel.findOne({ $or: [{ Phone:Phone_no }, { email: email_id }] })


      let idstrng=(alluser._id).toString()

       //let allprop_user = await propModel.find({ user_id:idstrng })

      propModel.find({user_id:idstrng })
      .then(allprop_user => {
        res.render('selectuser', { existingUser,pending_count,allprop_pending ,allprop_user,idstrng})
    })
    .catch(err => {

      req.flash('error_msg', 'User not found')
      res.redirect('/selectuser');
    });

     }else{
      req.flash('error_msg', 'Enter email or phone number')
      res.redirect('/selectuser');
     }












      // res.render('selectuser', { existingUser,pending_count,allprop_pending ,allprop_user})

    }
  } catch (error) {
    req.flash('error_msg', 'User not found')
      res.redirect('/selectuser');
      console.log(error)

  }
}

const prop_aprov = async (req, res) => {
  try {
    let token = req.cookies.token
    if (token) {

      let user = jwt.verify(token, SECRET_KEY)
      const idm = req.params.id

      let existingUser = await userModel.findOne({ email: user.email })

      let alluser = await userModel.find({})
      let allprop = await propModel.find({})

      let pending_count = await userModel.find({ status: "pending" }).countDocuments()
      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()

      const prop_approv_pipeline = [
        {
          $match: {
            atlprop_id: idm
          }
        },
        {
          $lookup: {
            from: 'usersches',           // The collection to join
            localField: 'user_id',   // Field from the orders collection
            foreignField: '_id',         // Field from the customers collection
            as: 'propt_info'          // Alias for the joined data
          }

        },



        {
          $addFields: {
            users: { $first: "$propt_info" },
          }
        },


        {
          $project: {
            "atlprop_id": 1,
            "image": 1,
            "prop_kind": 1,
            "Bedrooms": 1,
            "prop_type": 1,
            "rent": 1,
            "deposit": 1,
            "users.Phone": 1,
            "users.userFname": 1,
            "users.userLname": 1,
            "users.role": 1,
            "approved_by": 1,
            "status": 1,
            "live": 1,
            "Bathrooms": 1,
            "Balconies": 1,
            "Furnishing": 1,
            "Coveredparking": 1,
            "openparking": 1,
            "Facing": 1,
            "House_no": 1,
            "Society": 1,
            "Locality": 1,
            "Pin_code": 1,
            "City": 1,
            "Latitude": 1,
            "Longitude": 1,
            "Total_floor": 1,
            "Property_on_floor": 1,
            "ageBulding": 1,
            "Available": 1,
            "furnicheckbox": 1,
            "otherRoom": 1,
            "Willing": 1,
            "amenities": 1,
            "add_info_text": 1,
            "created": 1,
            "Bult_up_Area": 1


          }
        }


      ]
      const prop_approv = await propModel.aggregate(prop_approv_pipeline)
      otherRoomt = JSON.parse(prop_approv[0].otherRoom[0])
      amenitiest = JSON.parse(prop_approv[0].amenities[0])
      willingt = JSON.parse(prop_approv[0].Willing[0])
      furnicheckboxt = JSON.parse(prop_approv[0].furnicheckbox[0])

      let ageBuldingt = prop_approv[0].ageBulding
      let age = new Date()
      let differenceInDays = Math.ceil((age - ageBuldingt) / (1000 * 60 * 60 * 24 * 365));
      let op = moment(prop_approv[0].Available).format('DD,MMMM,YYYY');
      let Availablet = op




      res.render('prop_aprov', { existingUser, alluser, pending_count, prop_approv, otherRoomt, amenitiest, differenceInDays, Availablet, allprop_pending })

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
      count_prop: 0,
      role: 1714,
      status: "pending",
      createdBy: 'self',
      approved_by: 'self'
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

      return res.redirect('/login')


    }
    if (existingUser.role != 2017 && existingUser.role != 9012 && existingUser.role != 9013) {
      req.flash('error_msg', 'Üser not allowed!! Only Admin  Editer & SubEditer can login')

      return res.redirect('/login')

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
        email: existingUser.email, id: existingUser._id, status: existingUser.status, role: existingUser.role
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

    res.redirect("/dashbord");



  }
  catch (error) {
    console.log(error + '84')
    req.flash('error_msg', 'Something went wrong')
    return res.redirect('/login')
  }
}

const change_password = async (req, res) => {
  const { email, new_password, old_password } = req.body

  const hospass = hash_password = await bcrypt.hash(new_password, 10)
  const user_detailsof = await userModel.findOne({ email: email })

  const matchPassword = await bcrypt.compare(old_password, user_detailsof.password)
  if (!matchPassword) {
    req.flash('error_msg', 'Password mismatch')
    return res.redirect('/login')

  }
  const hashedPassword = await bcrypt.hash(new_password, 10)

  user_detailsof.password = hashedPassword
  user_detailsof.save()
  return res.redirect('/login')

}

const forgotPassword = async (req, res) => {
  const { email } = req.body


  const existingUser = await userModel.findOne({ email: email })
  if (!existingUser) {
    req.flash('error_msg', 'Üser not found')
    return res.redirect('/forgot-password')
  }

  console.log(emailTemp.otp)
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

  sgMail.setApiKey(process.env.SENDGRID_API)
  const msg = {
    to: email, // Change to your recipient
    from: { name: "apnaTOLET-OTP", email: process.env.SENDGRID_REG_MAIL },
    subject: 'OTP FOR RESETPASSWORD',
    html: emailTemp.emailTr,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })


  existingUser.resetPasswordToken = emailTemp.otp;
  existingUser.resetPasswordExpires = Date.now() + 1800000; //   1/2 hours

  existingUser.save(emailTemp.otp)
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

  if (!user_s.role == 2017 && 9012 && 9013) {
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

const createUser = async (req, res) => {

  const { first_name, last_name, email, phone, role, createdBy } = req.body
  try {

    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { Phone: phone }]
    });

    if (existingUser) {

      return res.sendStatus(400)

    }
    let defult_val = ''
    let approved_byP = ''
    if (req.body.role == 1714 || req.body.role == 1298) {
      defult_val = "Approved"
      approved_byP = 'Auto'

    } else {
      defult_val = "pending"
      approved_byP = 'Approval_pending'
    }

    const result = await userModel.create({
      userFname: first_name,
      userLname: last_name,
      Phone: phone,
      password: '123',
      email: email,
      role: role,
      count_prop: 0,
      status: defult_val,
      createdBy: createdBy,
      approved_by: approved_byP
    })

    req.flash('success_msg', 'New user creat successfully ')

    res.redirect('/user_con');

    // return res.sendStatus(201)

  } catch (error) {
    console.log(error)

    res.sendStatus(403)

    return
  }
}
const edituser = (req, res) => {
  let searchQuery = { _id: req.params.id };

  let defult_val = ''
  let approved_byP = ''
  if (req.body.role == 1714 || req.body.role == 1298) {
    defult_val = "Approved"
    approved_byP = 'Auto'

  } else {
    defult_val = "pending"
    approved_byP = 'Approval_pending'
  }


  userModel.updateOne(searchQuery, {
    $set: {
      userFname: req.body.first_name,
      userLname: req.body.last_name,
      Phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      status: defult_val,
      approved_by: approved_byP

    }
  })
    .then(user_user => {
      req.flash('success_msg', 'Update successfully ')

      res.redirect('/user_con');


    })
    .catch(err => {
      req.flash('error_msg', 'Conflict with other user data!! ')
      res.redirect('/user_con');
    });

}

const delete_user = async (req, res) => {
  const _idq = req.body.id

  const count = await propModel.countDocumentsDocuments({ user_id: _idq })
  console.log(count);
  try {
    if (count == 0) {

      const gtl = await userModel.findByIdAndDelete(_idq)


      res.sendStatus(202)
    } else {
      req.flash('error_msg', `${count}property linked !!! delete propery befor delete user `)
      res.sendStatus(302)
    }
  } catch (error) {

  }

}

const approve_user = async (req, res) => {
  const pass = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(pass, 10)
    const _id = req.body.id
    const curid = req.body.curid


    userModel.updateOne({ _id }, {
      $set: {
        status: 'Approved',
        approved_by: curid,
        password: hashedPassword

      }
    }).then(user_user => {

      req.flash('success_msg', 'Approved.')
      res.sendStatus(202)
    })

  } catch (error) {
    console.log(error)
  }
  // otpGenerator.generate(8, {
  //   upperCaseAlphabets: true,
  //   lowerCaseAlphabets: true,
  //   specialChars: true
  // })


}

const newpropo = async (req, res) => {

  const uploadedImages = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const random = uuidv4();
      const x = await cloudinary.uploader.upload(req.files[i].path, {

        public_id: random,
        overlay: {
          font_family: 'Arial',
          font_size: 20,
          color: 'red',
          text: 'apnaTOLET.com',

          x: 100,
          y: 10
        },
        opacity: 70,
        gravity: 'south_east',

        // transformation: [
        //   { width: 1000, height: 1000, crop: 'fill' } // Crop the image to 200x200 pixels
        // ]
        // transformation: [
        //  { width: 800, crop: 'scale' } // Scale the image to 800 pixels in width
        //  ]
        //  transformation: [
        // { aspect_ratio: "16:9", crop: 'crop' } // Crop the image to a 16:9 aspect ratio
        //  ]
        transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }]





      },)

      uploadedImages.push({ url: x.secure_url, pid: random });//,'ogfilename':x.original_filename

      fs.unlink((req.files[i].path),
        function (err) {
          if (err) console.log(err);
          else console.log("\nDeleted file");
        })
    }

  } catch (error) {
    console.log(error)
  }



  const { prop_kind, prop_type, Bedrooms, Bathrooms, Balconies, Furnishing, Coveredparking, openparking, Facing, House_no, Society, Locality,
    Pin_code, City, Latitude, Longitude, Bult_up_Area, Total_floor, Property_on_floor, ageBulding, Available, furnicheckbox, otherRoom, Willing,
    amenities, rent, user_id, Add_info_text, Add_info_radio, deposit } = req.body

  const image = uploadedImages
  try {
    const sid = await counterModel.updateOne(
      { id: 'autoval' },
      { '$inc': { 'seq': 1 } },
      { new: true },


    )

    const newPropid = await counterModel.findOne({ id: 'autoval' })

    newPropid.seq

    const result2 = await propModel.create({
      user_id: user_id,
      atlprop_id: newPropid.seq,
      prop_kind: prop_kind,
      prop_type: prop_type,
      Bedrooms: Bedrooms,
      Bathrooms: Bathrooms,
      Balconies: Balconies,
      Furnishing: Furnishing,
      Coveredparking: Coveredparking,
      openparking: openparking,
      Facing: Facing,
      House_no: House_no,
      Society: Society,
      Locality: Locality,
      Pin_code: Pin_code,
      City: City,
      Latitude: Latitude,
      Longitude: Longitude,
      Bult_up_Area: Bult_up_Area,
      Total_floor: Total_floor,
      Property_on_floor: Property_on_floor,
      ageBulding: ageBulding,
      Available: Available,
      furnicheckbox: [furnicheckbox],
      otherRoom: [otherRoom],
      Willing: [Willing],
      image: image,
      amenities: [amenities],
      rent: rent,
      deposit: deposit,
      add_info_text: Add_info_text,
      add_info_radio: Add_info_radio,
      approved_by: 'Approval_pending',
      status: "pending",
      live: 'off'
    })
    await userModel.findByIdAndUpdate(user_id, { $inc: { count_prop: 1 } }, { new: true })


    res.sendStatus(201)




  } catch (error) {

    console.log(error + 'asif49')
    req.flash('error_msg', error)



  }

}

const prop_delete = async (req, res) => {
  try {

    const propaptl_id = req.params.id
    const prop_details = await propModel.findOne({ atlprop_id: propaptl_id })

    for (let i = 0; i < prop_details.image.length; i++) {


      const pid = prop_details.image[i].pid

      if (pid) {
        await cloudinary.uploader.destroy(pid);
      }

    }

    const user_id_m = prop_details.user_id
    await userModel.findByIdAndUpdate(user_id_m, { $inc: { count_prop: -1 } }, { new: true })
    const rmProduct = await propModel.findByIdAndDelete(prop_details._id);




    req.flash('success_msg', 'Deleted successfully ')

    res.redirect('/prop_con');


  } catch (error) {
    console.log(error)

  }




}

const approve_prop = async (req, res) => {

  const ids = req.params.id
  const do_value = req.body.do_this
  const current_user = req.body.approved_by

  let Live = ''
  if (do_value === "Hold") {
    Live = 'off'
  } else {
    Live = 'on'
  }


  const resultt = await propModel.updateOne({ _id: ids }, {
    $set: {

      status: do_value,
      approved_by: current_user,
      live: Live


    }
  })

    .then(user_user => {

      req.flash('success_msg', 'Update successfully ')


      res.redirect('/prop_con');



    })
    .catch(err => {
      req.flash('error_msg', 'Something went wrong!! ')
      res.redirect('/prop_con');
    });

}
const edit_prop = async (req, res) => {
  try {


    let token = req.cookies.token
    if (token) {

      let user = jwt.verify(token, SECRET_KEY)

      let existingUser = await userModel.findOne({ email: user.email })
      const user_id = req.params.id

      let alluser = await userModel.find({})
      let allprop_edit = await propModel.find({ _id: user_id })
      let willingt = JSON.parse(allprop_edit[0].Willing[0])
      let otherRoomt = JSON.parse(allprop_edit[0].otherRoom[0])
      let amenitiest = JSON.parse(allprop_edit[0].amenities[0])
      let furnicheckboxt = JSON.parse(allprop_edit[0].furnicheckbox[0])
      let Availableq = moment(allprop_edit[0].Available).format('YYYY-MM-DD');
      let ageBuldingq = moment(allprop_edit[0].ageBulding).format('YYYY-MM');

      let allprop_pending = await propModel.find({ status: "pending" }).countDocuments()



      let pending_count = await userModel.find({ status: "pending" }).countDocuments()

      res.render('edit', { existingUser, alluser, pending_count, allprop_edit, willingt, otherRoomt, amenitiest, furnicheckboxt, Availableq, ageBuldingq, allprop_pending })

    }
  } catch (error) {
    console.log(error)
  }

}

const hjyu = async (req, res) => {

  const uploadedImages = [];
  try {
    for (let i = 0; i < req.files.length; i++) {
      const random = uuidv4();
      const x = await cloudinary.uploader.upload(req.files[i].path, {

        public_id: random,
        overlay: {
          font_family: 'Arial',
          font_size: 20,
          color: 'red',
          text: 'apnaTOLET.com',

          x: 100,
          y: 10
        },
        opacity: 70,
        gravity: 'south_east',
        // transformation: [
        //   { aspect_ratio: "16:9", crop: 'crop' } // Crop the image to a 16:9 aspect ratio
        //    ]
        transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }]


      },)


      let pid = random

      uploadedImages.push({ url: x.secure_url, pid: random });//,'ogfilename':x.original_filename

      await propModel.updateOne({ _id: req.params.id }, { $push: { image: { url: x.secure_url, pid: pid } } })


      fs.unlink((req.files[i].path),
        function (err) {
          if (err) console.log(err);
          else console.log("\nDeleted file");
        })


    }

  } catch (error) {
    console.log(error)
  }
  if (req.body.deleteImages) {
    for (let i = 0; i < req.body.deleteImages.length; i++) {


      const pid = req.body.deleteImages[i]

      if (pid) {
        await cloudinary.uploader.destroy(pid);
      }
      const rmProduct = await propModel.updateOne({ _id: req.params.id }, { $pull: { image: { pid: pid } } });


    }
  }

  const idl = req.params.id;

  const {
    kind_of_prop,
    prop_type,
    House_no,
    Society,
    Locality,
    Pin_code,
    City,
    Latitude,
    Longitude,
    Bedrooms,
    Bathrooms,
    Balconies,
    Bult_up_Area,
    rent,
    Available,
    FullyFurnishrd,
    Covered_parking,
    Open_parking,
    Total_floor,
    Property_on_floor,
    Facing,
    ageBulding,
    amenities,
    Add_info_text,
    Add_info_radio,
    Willing,
    deposit,
    Other_Rooms,
    furnishing_item,
  } = req.body


  let ameniti = ''
  function amini() {
    if (Array.isArray(amenities)) {
      ameniti = JSON.stringify(amenities)

    } else if (amenities === undefined) {

      ameniti = '[]'

    } else {


      ameniti = '[' + JSON.stringify(amenities) + ']'
    }


  }

  amini()



  let otherRoom_p = ''
  function other() {
    if (Array.isArray(Other_Rooms)) {
      otherRoom_p = JSON.stringify(Other_Rooms)

    } else if (Other_Rooms === undefined) {

      otherRoom_p = '[]'

    } else {

      otherRoom_p = '[' + JSON.stringify(Other_Rooms) + ']'
    }
  }

  other()



  let Willing_p = ''
  function wili() {
    if (Array.isArray(Willing)) {
      Willing_p = JSON.stringify(Willing)

    } else if (Willing === undefined) {

      Willing_p = '[]'

    } else {

      Willing_p = '[' + JSON.stringify(Willing) + ']'
    }
  }

  wili()


  let furnicheckbox_p = ''
  function furni() {
    if (Array.isArray(furnishing_item)) {
      furnicheckbox_p = JSON.stringify(furnishing_item)

    } else if (furnishing_item === undefined) {

      furnicheckbox_p = '[]'

    } else {

      furnicheckbox_p = '[' + JSON.stringify(furnishing_item) + ']'
    }
  }

  furni()

  const relur = await propModel.updateOne({ _id: idl }, {
    $set: {


      prop_kind: kind_of_prop,
      prop_type: prop_type,
      Bedrooms: Bedrooms,
      Bathrooms: Bathrooms,
      Balconies: Balconies,
      Furnishing: FullyFurnishrd,
      Coveredparking: Covered_parking,
      openparking: Open_parking,
      Facing: Facing,
      House_no: House_no,
      Society: Society,
      Locality: Locality,
      Pin_code: Pin_code,
      City: City,
      Latitude: Latitude,
      Longitude: Longitude,
      Bult_up_Area: Bult_up_Area,
      Total_floor: Total_floor,
      Property_on_floor: Property_on_floor,
      ageBulding: ageBulding,
      Available: Available,
      furnicheckbox: furnicheckbox_p,
      otherRoom: otherRoom_p,
      Willing: Willing_p,
      amenities: [ameniti],
      rent: rent,
      deposit: deposit,
      add_info_text: Add_info_text,
      add_info_radio: Add_info_radio




    }
  })

  req.flash('success_msg', 'Update successfully ')
  res.redirect('/prop_con');



}


module.exports = {
  signin, signup, dashbord, forgotPassword, otp_check, createUser, edituser, delete_user,
  approve_user, newpropo, user_con, prop_con, new_prop_ent, prop_aprov, prop_delete, approve_prop, edit_prop, hjyu, change_password, selectuser,selectuser_result
}
