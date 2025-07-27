const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/WanderScapes');

const Destination = mongoose.model('destinations', new mongoose.Schema({
  name: String,
  description: String,
  image: String,
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/categories', async (req, res) => {
  const categories = await Destination.find().limit(3);
  res.json(categories);
});

app.get('/api/destinations', async (req, res) => {
  const all = await Destination.find();
  res.json(all);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
