import express from 'express';
import Model from '../models/model.js';

const router = express.Router();

// CREATE method
router.post('/', (req, res) => {
  const { firstName, lastName, age, color } = req.body;
  console.log('Request Body:', req.body);

  Model.create({ firstName, lastName, age, color })
    .then((data) => {
      console.log('Data successfully added', data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'Error adding data to database.' });
    });
});

// READ method
// using Async/ Await format
router.get('/', async (req, res) => {
  try {
    const data = await Model.find();
    return res.status(200).json(data); // Use `.json()` for sending JSON data
  } catch (err) {
    console.error('Error retrieving data:', err); // Log the error for debugging
    return res.status(500).json({ message: 'Error retrieving data' });
  }
});

// UPDATE method
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age, color } = req.body;

  Model.findByIdAndUpdate(
    { _id: id },
    { firstName, lastName, age, color },
    { new: true }
  )
    .then((data) => {
      console.log('Data updated successfully:', data);
      return res.status(200).json({message: `Data successfully updated: ${data}`});
    })
    .catch((err) => {
      return res.status(500).json({ message: 'Error updating data.' });
    });
});

// DELETE method
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Model.findByIdAndDelete({ _id: id })
    .then((data) => {
      console.log('Data deleted:', data);
      return res.status(200).json({ message: 'Data successfully deleted!' });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ message: 'Error deleting data from database.' });
    });
});

export default router;
