const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


//routes
app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);


//error
  app.use((req, res) => {
    res.status(404).render('error');
  })


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });