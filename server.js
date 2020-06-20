const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
  });

app.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random()*db.length)]);
  });  //ciekawe ze nie działa pod :id....

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
  });

app.delete('/testimonials/:id', (req, res) => {
    const object = db.testimonials.filter(item => item.id == req.params.id);
    db.testimonials.splice(db.testimonials.indexOf(object[0]), 1);
    res.json({message: 'OK, deleted'});
  });

app.put('/testimonials/:id', (req, res) => {
    const payload = {
        id: req.params.id, 
        author: 'placeholderAuthor', 
        text: 'placeholderText'
      }
    const object = db.testimonials.filter(item => item.id == req.params.id);
    db.testimonials.splice(db.testimonials.indexOf(object[0]), 1);
    db.testimonials.push(payload);  
    res.json({message: 'OK, updated'});
  });

  app.post('/testimonials', (req, res) => { 
    const payload = {
        id: uuidv4(),
        author: 'placeholderAuthor', 
        text: 'placeholderText'
    };
    db.testimonials.push(payload);
    res.json({ message: 'OK, posted' });
});



  app.use((req, res) => {
    res.status(404).render('error');
  })


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });