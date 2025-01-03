import express from 'express';
import Model from '../models/model.js';

const router = express.Router();

// CREATE method
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, age, color } = req.body;
    console.log('Request Body:', req.body);

    const data = await Model.create({ firstName, lastName, age, color });
    console.log('Data successfully added', data);
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error adding data to database:', err);
    return res.status(500).json({ message: 'Error adding data to database.' });
  }
});

// READ method
router.get('/', async (req, res) => {
  try {
    const data = await Model.find();
    console.log(`Retrieved from database: ${data}`);
    return res.status(200).json(data); // Use `.json()` for sending JSON data
  } catch (err) {
    console.error('Error retrieving data:', err); // Log the error for debugging
    return res.status(500).json({ message: 'Error retrieving data' });
  }
});

// UPDATE method
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age, color } = req.body;

    const data = await Model.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName, age, color },
      { new: true }
    );
    console.log('Data updated successfully:', data);
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error updating data:', err);
    return res.status(500).json({ message: 'Error updating data.' });
  }
});

// DELETE method
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Model.findByIdAndDelete({ _id: id });
    console.log('Data deleted:', data);
    return res.status(200).json({ message: 'Data successfully deleted!' });
  } catch (err) {
    console.error('Error deleting data to database:', err);
    return res
      .status(500)
      .json({ message: 'Error deleting data from database.' });
  }
});

export default router;
