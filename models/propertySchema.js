const mongoose=require('mongoose')

  const PropertySchema=({
    user_id:String,
    atlprop_id:String,
    prop_kind: String,
    prop_type: String,
    Bedrooms: Number,
    Bathrooms: Number,
    Balconies: Number,
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
    furnicheckbox:[String],
    otherRoom: [String],
    Willing: [String],
    rent:Number,
    image:String,
    amenities: [String],
    add_info:String,
    created: {type: Date, default: Date.now}
   
})

module.exports = mongoose.model("propSch", PropertySchema)