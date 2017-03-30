import mongoose = require('mongoose');

let PlaceSchema = new mongoose.Schema({
  name: String,
  address: String
});

export default mongoose.model('Place', PlaceSchema);
