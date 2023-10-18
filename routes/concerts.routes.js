const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller')


// get requests
router.route('/concerts').get(ConcertController.getAll);


router.route('/concerts/:id').get(ConcertController.getById);

// post requests
router.route('/concerts').post(ConcertController.addConcert)

// put requests
router.route('/concerts/:id').put(ConcertController.updateConcert);

// delete requests
router.route('/concerts/:id').delete(ConcertController.deleteConcert);

module.exports = router;