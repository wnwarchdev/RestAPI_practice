const mongoose = require('mongoose');

const concertsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Concerts', concertsSchema);