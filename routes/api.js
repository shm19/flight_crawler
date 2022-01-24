const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
  console.log(req);
});

module.exports = router;
