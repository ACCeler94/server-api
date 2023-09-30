const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 8000;
const db = require('./db/db');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


app.use(express.urlencoded({ extended: false })); // required to handle urlencode requests
app.use(express.json()); // required to handle form-data request (optional in this project)
app.use('/api', testimonialsRoutes); // add testimonials routes
app.use('/api', seatsRoutes); // add seats routes
app.use('/api', concertsRoutes); // add concerts routes


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})