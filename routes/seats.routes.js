const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.controller')


// get requests
router.route('/seats').get(SeatController.getAll);


router.route('/seats/:id').get(SeatController.getById);

// post requests
router.route('/seats').post(SeatController.addSeat)

// put requests
router.route('/seats/:id').put(SeatController.updateSeat);

// delete requests
router.route('/seats/:id').delete(SeatController.deleteSeat);

module.exports = router;