const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');


// get all
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

// get random
router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random()*db.testimonials.length)]);
  });  //ciekawe ze nie działa pod :id....

// get by id
router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
  });

// delete by id
router.route('/testimonials/:id').delete((req, res) => {
    const object = db.testimonials.filter(item => item.id == req.params.id);
    db.testimonials.splice(db.testimonials.indexOf(object[0]), 1);
    res.json({message: 'OK, deleted'});
  });

// get modify by id
router.route('/testimonials/:id').put((req, res) => {
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

// post new
router.route('/testimonials').post((req, res) => { 
    const payload = {
        id: uuidv4(),
        author: 'placeholderAuthor', 
        text: 'placeholderText'
    };
    db.testimonials.push(payload);
    res.json({ message: 'OK, posted' });
});



module.exports = router;