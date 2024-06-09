const mongoose = require('mongoose')
const UserSchema =new  mongoose.Schema({
    userFname: {
        type: String,
        required: true
    },
    userLname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    count_prop: {
        type: Number,
        required: false
    },
    approved_by: {
        type: String,
        required: false
    },
    refresh_token:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date


}, { timestamps: true })
module.exports = mongoose.model("userSch", UserSchema)
//role.admin=2017,role.editer=9012,Sub editer9013,role.field=7210,role.agent=2346,role.woner=1298,role.user=1714,