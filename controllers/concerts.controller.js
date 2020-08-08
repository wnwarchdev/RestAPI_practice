const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else {res.json(dep)};
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const dep = await(Concert.findById(req.params.id));
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}; 

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const dep = await Concert.find({performer: req.params.performer});
    if(!dep) res.status(404).json({ message: 'Performer not found' });
    else {res.json(dep)};
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const dep = await Concert.find({genre: req.params.genre});
    if(!dep) res.status(404).json({ message: 'Genre not found' });
    else {res.json(dep)};
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    const dep = await Concert.find({day: req.params.day});
    if(!dep) res.status(404).json({ message: 'Day not found' });
    else {res.json(dep)}; //czemu number nie działa?
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

  exports.getPrice = async (req, res) => {
    try {
      const priceMin = req.params.price_min;
      const priceMax = req.params.price_max;
      const priceMinInt = parseInt(priceMin);
      const priceMaxInt = parseInt(priceMax)
      const dep = await Concert.find({
        price: { 
          $gte: priceMinInt,
          $lte: priceMaxInt
        }
      });
      if(!dep) res.status(404).json({ message: 'Nothing within price bracket' });// czemu Number nie dziala?
      else {res.json(dep)}
      //else res.json({ message: typeof(priceMinInt) });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };