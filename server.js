const express = require('express');
const { v4: uuidv4 } = require('uuid');


const db = [
    { id: 1, author: 'John Doe', text: 'Worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'Make you happy.' },
    { id: 3, author: 'Fox Mulder', text: 'The truth is out there.' },
    { id: 4, author: 'Dana Scully', text: 'Sure. Fine. Whatever.' }, 
    { id: 5, author: 'Walter Skinner', text: 'Are we done?' },
    { id: 6, author: 'Little Green Man', text: 'We come in peace!' },
  ];
  //console.log(db.length);
  //console.log(Math.floor(Math.random()*db.length));
  //console.log(db)
  //console.log(db[2])
  //console.log(db[Math.floor(Math.random()*db.length)])
  

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get('/testimonials', (req, res) => {
    res.json(db);
  });

app.get('/testimonials/random', (req, res) => {
    res.json(db[Math.floor(Math.random()*db.length)]);
  });  //ciekawe ze nie działa pod :id....

app.get('/testimonials/:id', (req, res) => {
    res.json(db.filter(item => item.id == req.params.id));
  });

app.delete('/testimonials/:id', (req, res) => {
    const object = db.filter(item => item.id == req.params.id);
    db.splice(db.indexOf(object[0]), 1);
    res.json({message: 'OK, deleted'});
  });

app.put('/testimonials/:id', (req, res) => {
    const payload = {
        id: req.params.id, 
        author: 'placeholderAuthor', 
        text: 'placeholderText'
      }
    const object = db.filter(item => item.id == req.params.id);
    db.splice(db.indexOf(object[0]), 1);
    db.push(payload);  
    res.json({message: 'OK, updated'});
  });

  app.post('/testimonials', (req, res) => { 
    const payload = {
        id: uuidv4(),
        author: 'placeholderAuthor', 
        text: 'placeholderText'
    };
    db.push(payload);
    res.json({ message: 'OK, posted' });
});



  app.use((req, res) => {
    res.status(404).render('error');
  })


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });