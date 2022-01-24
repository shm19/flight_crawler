const express = require('express');
const router = express.Router();

router.get('/flights', (req, res) => {
  res.send('OK');
});

router.post('/flights', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

module.exports = router;
