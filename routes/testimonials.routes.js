const express = require('express');
const router = express.Router();
const db = require('./../db/db');


// get requests
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials)
});

router.route('/testimonials/random').get((req, res) => {
  const index = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[index])
});

router.route('/testimonials/:id').get((req, res) => {
  const elementToReturn = db.testimonials.find(element => element.id == req.params.id);
  res.json(elementToReturn);
});

// post requests
router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    const newEntry = { id: uuidv4(), author, text }
    db.testimonials.push(newEntry);
    res.json({ message: 'OK', newEntry })
  } else {
    res.json('Testimonial is not complete! Please try again!')
  }
})

// put requests
router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const elementToChange = db.testimonials.find(element => element.id == req.params.id);

  if (elementToChange && text && author) {
    elementToChange.author = author;
    elementToChange.text = text;
    res.json({ message: 'OK' });
  } else {
    res.json('No testimonial was changed! Try again.');
  };
});

// delete requests
router.route('/testimonials/:id').delete((req, res) => {
  const indexToRemove = db.testimonials.findIndex(element => element.id == req.params.id);
  if (indexToRemove !== -1) {
    db.testimonials.splice(indexToRemove, 1); // modify the array in place
    res.json({ message: 'OK' });
  } else {
    res.json('No element with this id was found!');
  }
});

module.exports = router;