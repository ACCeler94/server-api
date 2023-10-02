const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


app.use(express.urlencoded({ extended: false })); // required to handle urlencode requests
app.use(express.json()); // required to handle form-data request (optional in this project)
app.use(cors()); // middleware to enable CORS requests
app.use('/api', testimonialsRoutes); // add testimonials routes
app.use('/api', seatsRoutes); // add seats routes
app.use('/api', concertsRoutes); // add concerts routes




// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});