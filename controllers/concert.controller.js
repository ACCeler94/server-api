const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());

  } catch (error) {
    res.status(500).json({ message: error })
  }
};

exports.getById = async (req, res) => {
  try {
    const concertElem = await Concert.findById(req.params.id)
    if (concertElem) {
      res.json(concertElem);
    } else {
      res.status(404).json('No element with this id was found!')
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

exports.addConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save()
    res.json({ message: 'OK', newConcert })
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

exports.updateConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer, genre, price, day, image } });
      res.json({ message: 'OK' })
    } else res.status(404).json({ message: 'Not found' })

  } catch (error) {
    res.status(500).json({ message: error })
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const concertElem = await Concert.findById(req.params.id)
    if (concertElem) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json('No element with this id was found!');
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
};