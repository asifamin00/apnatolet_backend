const mongoose=require('mongoose')
const UserSchema=mongoose.Schema({
    userFname:{
        type:String,
        required:true
    },
    userLname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Roll:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },


     
},{timestamps:true})
module.exports=mongoose.model("userSch", UserSchema)
//Roll.admin=2017,Roll.editer=9012,Roll.field=7210,Roll.agent=2346,Roll.woner=1298,Roll.user=1714,