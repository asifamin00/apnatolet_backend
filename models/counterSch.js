const mongoose=require('mongoose')
const counterSchema=({
    id:String,
    seq:Number

})
module.exports = mongoose.model("counterSch", counterSchema)