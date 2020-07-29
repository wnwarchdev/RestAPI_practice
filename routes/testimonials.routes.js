const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller')


router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getId);
router.post('/testimonials', TestimonialController.post);
router.put('/testimonials/:id', TestimonialController.put);
router.delete('/testimonials/:id', TestimonialController.delete);

module.exports = router;