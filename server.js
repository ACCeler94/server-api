const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use((req, res, next) => {
  req.io = io;
  next();
});


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

const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rczlaff.mongodb.net/newWaveFestival?retryWrites=true&w=majority'`
  : 'mongodb://localhost:27017/newWaveFestival';


// connects our backend code with the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New Socket!')
})