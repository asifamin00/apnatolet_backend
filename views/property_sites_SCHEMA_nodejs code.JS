const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/propertyDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Property schema
const propertySchema = new mongoose.Schema({
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
});

const Property = mongoose.model('Property', propertySchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a new property listing
app.post('/properties', (req, res) => {
  const newProperty = new Property(req.body);
  newProperty.save((err, property) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(property);
    }
  });
});

// Get all property listings
app.get('/properties', (req, res) => {
  Property.find({}, (err, properties) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(properties);
    }
  });
});

// Get property by ID
app.get('/properties/:id', (req, res) => {
  Property.findById(req.params.id, (err, property) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(property);
    }
  });
});

// Update property by ID
app.put('/properties/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, property) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(property);
    }
  });
});

// Delete property by ID
app.delete('/properties/:id', (req, res) => {
  Property.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


{
  "property": {
    "_id": ObjectId,
    "title": String,
    "description": String,
    "price": Number,
    "location": {
      "type": String,
      "coordinates": [Number]
    },
    "address": String,
    "bedrooms": Number,
    "bathrooms": Number,
    "area": Number,
    "amenities": [String],
    "type": String, // e.g., apartment, house, villa
    "status": String, // e.g., for sale, for rent
    "images": [String], // URLs of property images
    "postedBy": ObjectId, // User who posted the property
    "createdAt": Date,
    "updatedAt": Date
  },
  "user": {
    "_id": ObjectId,
    "username": String,
    "email": String,
    "password": String,
    "phone": String,
    "createdAt": Date,
    "updatedAt": Date
  }
}
