const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();



app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));



//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

//build modification
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


//error
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
  })


///mongoose
  mongoose.connect('mongodb+srv://${process.env.srvUserName}:${process.env.srvPassword}@cluster0.cfcxb.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;


  db.once('open', () => {
    console.log('Connected to the database with mongoose');
  });
  db.on('error', err => console.log('Error ' + err));


  /// socket

  const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running...with websocket');
  });

  const io = socket(server);

  io.on('connection', () => {
    console.log('New socket!')
  });

  module.exports = server
