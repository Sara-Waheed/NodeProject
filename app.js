const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/items');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/items', items);
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
);

mongoose.connect('mongodb://localhost:27017/dummydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
