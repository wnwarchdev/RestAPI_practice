const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Seats', seatsSchema);