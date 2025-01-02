import express from 'express';
import Model from '../models/model.js';

const router = express.Router();

router.get('/', (req, res) => {
  Model.find()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: 'error retrieving data' });
    });
});

router.post('/', (req, res) => {
  const { firstName, lastName, age, color } = req.body;
  console.log('Request Body:', req.body);

  Model.create({ firstName, lastName, age, color })
    .then((data) => {
      console.log('Data successfully added', data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log('error something something');
      return res
        .status(500)
        .json({ message: 'Error adding data to database.' });
    });
});

router.patch('/user/:id', (req, res) => {
  Model.findByIdAndUpdate().then().catch();
});

router.delete('/user/:id', (req, res) => {
  Model.findByIdAndDelete().then().catch();
});

export default router;
