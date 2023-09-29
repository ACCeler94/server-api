const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8000;

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({ extended: false })); // required to handle urlencode requests
app.use(express.json()); // required to handle form-data request (optional in this project)

// get requests
app.get('/testimonials', (req, res) => {
  res.json(db)
});

app.get('/testimonials/random', (req, res) => {
  const index = Math.floor(Math.random() * db.length);
  res.json(db[index])
});

app.get('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const elementToReturn = db.find(element => element.id === id);
  res.json(elementToReturn);
});

// post requests
app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (author && text) {
    const newEntry = { id: uuidv4(), author, text }
    db.push(newEntry);
    res.json({ message: 'OK', newEntry })
  } else {
    res.json('Testimonial is not complete! Please try again!')
  }
})

// put requests
app.put('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;
  const elementToChange = db.find(element => element.id === id);

  if (elementToChange && text && author) {
    elementToChange.author = author;
    elementToChange.text = text;
    res.json({ message: 'OK' });
  } else {
    res.json('No testimonial was changed! Try again.');
  };
});

// delete requests
app.delete('/testimonials/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indexToRemove = db.findIndex(element => element.id === id);
  if (indexToRemove !== -1) {
    db.splice(indexToRemove, 1); // modify the array in place
    res.json({ message: 'OK' });
  } else {
    res.json('No element with this id was found!');
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})