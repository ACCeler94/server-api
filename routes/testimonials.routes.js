const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonial.controller')


// get requests
router.route('/testimonials').get(TestimonialController.getAll);

router.route('/testimonials/random').get(TestimonialController.getRandom);

router.route('/testimonials/:id').get(TestimonialController.getById);

// post requests
router.route('/testimonials').post(TestimonialController.addTestimonial)

// put requests
router.route('/testimonials/:id').put(TestimonialController.updateTestimonial);

// delete requests
router.route('/testimonials/:id').delete(TestimonialController.deleteTestimonial);

module.exports = router;