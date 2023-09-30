const express = require('express');
const router = express.Router();
const db = require('./../db/db');


// get requests
router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
});


router.route('/concerts/:id').get((req, res) => {
  const elementToReturn = db.concerts.find(element => element.id == req.params.id);
  res.json(elementToReturn);
});

// post requests
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (performer && genre && price && day && image) {
    const newEntry = { id: uuidv4(), performer, genre, price, day, image }
    db.concerts.push(newEntry);
    res.json({ message: 'OK', newEntry })
  } else {
    res.json('Concert data is not complete! Please try again!')
  }
})

// put requests
router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const elementToChange = db.concerts.find(element => element.id == req.params.id);

  if (elementToChange) {
    if (performer) elementToChange.performer = performer;
    if (genre) elementToChange.genre = genre;
    if (price) elementToChange.price = price;
    if (day) elementToChange.day = day;
    if (image) elementToChange.image = image;

    res.json({ message: 'OK' });
  } else {
    res.json('No concert was changed! Try again.');
  };
});

// delete requests
router.route('/concerts/:id').delete((req, res) => {
  const indexToRemove = db.concerts.findIndex(element => element.id == req.params.id);
  if (indexToRemove !== -1) {
    db.concerts.splice(indexToRemove, 1); // modify the array in place
    res.json({ message: 'OK' });
  } else {
    res.json('No element with this id was found!');
  }
});

module.exports = router;