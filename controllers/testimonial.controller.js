const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  res.json(await Testimonial.find())
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand);
    if (!test) res.status(404).json({ message: 'Not found' });
    else res.json(test);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const testimonialElem = await Testimonial.findById(req.params.id);
    if (testimonialElem) {
      res.json(testimonialElem);
    } else {
      res.status(404).json('No element with this id was found!')
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.addTestimonial = async (req, res) => {
  const { author, text } = req.body;
  const cleanAuthor = sanitize(author);
  const cleanText = sanitize(text)
  try {
    const newElem = new Testimonial({ author: cleanAuthor, text: cleanText });
    await newElem.save()
    res.json({ message: 'OK' })
  } catch (error) {
    res.json({ message: error })
  }
}

exports.updateTestimonial = async (req, res) => {
  const { author, text } = req.body;
  try {
    const testimonialElem = await Testimonial.findById(req.params.id)
    if (testimonialElem) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author, text } })
      res.json({ message: 'OK' });
    } else {
      res.status(400).json('Bad request. No testimonial was changed! Try again.');
    };
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonialElem = await Testimonial.findById(req.params.id)
    if (testimonialElem) {
      await Testimonial.deleteOne({ _id: req.params.id })
      res.json({ message: 'OK' });
    } else {
      res.status(404).json('No element with this id was found!');
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
}