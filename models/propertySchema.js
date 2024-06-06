const mongoose=require('mongoose')

  const PropertySchema=new mongoose.Schema({
    user_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"userSch"
    },
    atlprop_id:String,
    prop_kind: String,
    prop_type: String,
    Bedrooms: String,
    Bathrooms: String,
    Balconies: String,
    Furnishing: String,
    Coveredparking: Number,
    openparking: Number,
    Facing:String,
    House_no: String,
    Society: String,
    Locality: String,
    Pin_code: Number,
    City: String,
    Latitude: Number,
    Longitude: Number,
    Bult_up_Area:Number,
    Total_floor:Number,
    Property_on_floor: Number,
    ageBulding: Date,
    Available: Date,
    furnicheckbox:Array,
    otherRoom: Array,
    Willing: Array,
    rent:Number,
    deposit:Number,
    image:Array,
    amenities:Array,
    add_info_text:String,
    add_info_radio:String,
    approved_by:String,
    status: String,
    live:String,
    
   
},{ timestamps: true })

module.exports = mongoose.model("propSch", PropertySchema)