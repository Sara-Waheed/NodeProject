const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  const all = await Item.find();
  res.json(all);
});

router.post('/', async (req, res) => {
  const it = new Item(req.body);
  await it.save();
  res.status(201).json(it);
});

module.exports = router;
