const express = require('express');
const router = express.Router();
const Seat = require('../models/seat.model')


// get requests
router.route('/seats').get(async (req, res) => {
  try {
    res.json(await Seat.find())
  } catch (error) {
    res.status(500).json({ message: error })
  }
});


router.route('/seats/:id').get(async (req, res) => {
  try {
    const seatElem = await Seat.findById(req.params.id)
    if (seatElem) {
      res.json(seatElem);
    } else {
      res.status(404).json('No element with this id was found!')
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

// post requests
router.route('/seats').post(async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const takenSeat = await Seat.findOne({ day, seat }); // check if there is already a seat elem with the same day and seat as request
    if (!takenSeat) {
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      res.json({ message: 'OK' })
    } else {
      res.status(409).json({ message: "This seat is already taken..." })
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
})

// put requests
router.route('/seats/:id').put(async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seatElem = await Seat.findById(req.params.id);

    if (seatElem) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day, seat, client, email } });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json('No element with this id was found!');
    };
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// delete requests
router.route('/seats/:id').delete(async (req, res) => {
  try {
    const seatElem = await Seat.findById(req.params.id)
    if (seatElem) {
      await Seat.deleteOne({ _id: req.params.id })
      res.json({ message: 'OK' });
    } else {
      res.status(404).json('No element with this id was found!');
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
});

module.exports = router;