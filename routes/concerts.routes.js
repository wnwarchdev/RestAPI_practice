const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller')


router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getId);
router.post('/concerts', ConcertController.post);
router.put('/concerts/:id', ConcertController.put);
router.delete('/concerts/:id', ConcertController.delete);

router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getPrice);
router.get('/concerts/price/day/:day', ConcertController.getDay);

module.exports = router;