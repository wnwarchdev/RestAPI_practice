const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


// get all
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

// get by id
router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
  });

// delete by id
router.route('/concerts/:id').delete((req, res) => {
    const object = db.concerts.filter(item => item.id == req.params.id);
    db.concerts.splice(db.concerts.indexOf(object[0]), 1);
    res.json({message: 'OK, deleted'});
  });

// get modify by id
router.route('/concerts/:id').put((req, res) => {
    const payload = {
        id: req.params.id, 
        performer: 'placeholderPerformer'
      }
    const object = db.concerts.filter(item => item.id == req.params.id);
    db.concerts.splice(db.concerts.indexOf(object[0]), 1);
    db.concerts.push(payload);  
    res.json({message: 'OK, updated'});
  });

// post new
router.route('/concerts').post((req, res) => { 
    const payload = {
        id: uuidv4(),
        performer: 'placeholderPerformer'
    };
    db.concerts.push(payload);
    res.json({ message: 'OK, posted' });
});



module.exports = router;