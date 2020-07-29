const mongoose = require('mongoose');

const testimonialsSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('Testimonials', testimonialsSchema);