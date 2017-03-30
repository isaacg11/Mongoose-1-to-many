import mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
  name: String,
  places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
});

export default mongoose.model('Category', CategorySchema);
