const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//testimonials
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
  });

app.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random()*db.testimonials.length)]);
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

//concerts
app.get('/concerts', (req, res) => {
    res.json(db.concerts);
  });

app.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
  });

app.post('/concerts', (req, res) => { 
  const payload = {
      id: uuidv4(),
      performer: 'placeholderPerformer'
    };
  db.concerts.push(payload);
  res.json({ message: 'OK, posted' });
});

app.delete('/concerts/:id', (req, res) => {
  const object = db.concerts.filter(item => item.id == req.params.id);
  db.concerts.splice(db.concerts.indexOf(object[0]), 1);
  res.json({message: 'OK, deleted'});
});

app.put('/concerts/:id', (req, res) => {
  const payload = {
      id: req.params.id, 
      performer: 'placeholderPerformer'
    }
  const object = db.concerts.filter(item => item.id == req.params.id);
  db.concerts.splice(db.concerts.indexOf(object[0]), 1);
  db.concerts.push(payload);  
  res.json({message: 'OK, updated'})
});


//seats
app.get('/seats', (req, res) => {
    res.json(db.seats);
  });

app.get('/seats/:id', (req, res) => {
    res.json(db.seats.filter(item => item.id == req.params.id));
  });

app.post('/seats', (req, res) => { 
  const payload = {
      id: uuidv4(),
      client: 'placeholderClient', 
      seat: 'placeholderSeat'
    };
  db.seats.push(payload);
  res.json({ message: 'OK, posted' });
});

app.delete('/seats/:id', (req, res) => {
  const object = db.seats.filter(item => item.id == req.params.id);
  db.seats.splice(db.seats.indexOf(object[0]), 1);
  res.json({message: 'OK, deleted'});
});

app.put('/seats/:id', (req, res) => {
  const payload = {
      id: req.params.id, 
      client: 'placeholderClient', 
      seat: 'placeholderSeat'
    }
  const object = db.seats.filter(item => item.id == req.params.id);
  db.seats.splice(db.seats.indexOf(object[0]), 1);
  db.seats.push(payload);  
  res.json({message: 'OK, updated'});
});





//error
  app.use((req, res) => {
    res.status(404).render('error');
  })


app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });