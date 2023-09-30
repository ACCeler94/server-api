const express = require('express');
const router = express.Router();
const db = require('./../db/db');


// get requests
router.route('/seats').get((req, res) => {
  res.json(db.seats)
});


router.route('/seats/:id').get((req, res) => {
  const elementToReturn = db.seats.find(element => element.id == req.params.id);
  res.json(elementToReturn);
});

// post requests
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if (day && seat && client && email) {
    const newEntry = { id: uuidv4(), day, seat, client, email }
    db.seats.push(newEntry);
    res.json({ message: 'OK', newEntry })
  } else {
    res.json('Seat data is not complete! Please try again!')
  }
})

// put requests
router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const elementToChange = db.seats.find(element => element.id == req.params.id);

  if (elementToChange) {
    if (day) elementToChange.day = day;
    if (seat) elementToChange.seat = seat;
    if (client) elementToChange.client = client;
    if (email) elementToChange.email = email;

    res.json({ message: 'OK' });
  } else {
    res.json('No seat was changed! Try again.');
  };
});

// delete requests
router.route('/seats/:id').delete((req, res) => {
  const indexToRemove = db.seats.findIndex(element => element.id == req.params.id);
  if (indexToRemove !== -1) {
    db.seats.splice(indexToRemove, 1); // modify the array in place
    res.json({ message: 'OK' });
  } else {
    res.status(404).json('No element with this id was found!');
  }
});

module.exports = router;