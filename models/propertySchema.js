const mongoose=require('mongoose')
const PropertySchema=({
    title: String,
    description: String,
    price: Number,
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    address: String,
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    amenities: [String],
    type: String,
    status: String,
    images: [String],
    createdBy:String,
    updatedBy:String,
    status:String

},{timestamps:true})