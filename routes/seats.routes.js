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
    res.json(db.seats.filter(item => item.id == req.params.id));
  });

// delete by id
router.route('/seats/:id').delete((req, res) => {
    const object = db.seats.filter(item => item.id == req.params.id);
    db.seats.splice(db.seats.indexOf(object[0]), 1);
    res.json({message: 'OK, deleted'});
  });

// get modify by id
router.route('/seats/:id').put((req, res) => {
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

// post new
router.route('/seats').post((req, res) => { 
    const payload = {
        id: uuidv4(),
        client: 'placeholderClient', 
        seat: 'placeholderSeat'
    };
    db.seats.push(payload);
    res.json({ message: 'OK, posted' });
});



module.exports = router;