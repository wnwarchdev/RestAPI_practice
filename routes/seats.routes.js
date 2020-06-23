const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


// get all
router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

// get by id
router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find(item => item.id == req.params.id)); //dodaj warunek
  });

// delete by id
router.route('/seats/:id').delete((req, res) => {
    const object = db.seats.findIndex(item => item.id == req.params.id); //index
    db.seats.splice(object, 1);
    res.json({message: 'OK, deleted'});
  });

// get modify by id
router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body
    const payload = {
        id: req.params.id, 
        day: day,
        seat: seat,
        client: client,
        email: email, 
      }
    const index = db.seats.findIndex(item => item.id == req.params.id);
    db.seats.splice(index, 1); //payload
    db.seats.push(payload);  
    res.json({message: 'OK, updated'});
  });

// post new
router.route('/seats').post((req, res) => { 
    const { day, seat, client, email } = req.body
    const payload = {
        id: uuidv4(),
        day: day,
        seat: seat,
        client: client,
        email: email, 
    };
    db.seats.push(payload);
    res.json({ message: 'OK, posted' });
});



module.exports = router;

///
router.route('/seats').post((req, res) => { 
  const { day, seat, client, email } = req.body
  const payload = {
      id: uuidv4(),
      day: day,
      seat: seat,
      client: client,
      email: email, 
  };

  if (db.seats.some(item => (item.seat === payload.seat || item.day === payload.day))) {
    res.json({message: 'The slot is already taken...'});
  } else {
    db.seats.push(payload);
    res.json({ message: 'OK, posted' });
  }

});