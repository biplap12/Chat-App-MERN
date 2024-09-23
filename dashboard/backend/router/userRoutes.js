const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', User);
router.post('/', User);
router.get('/:id', User);
router.put('/:id', User);
router.delete('/:id', User);


module.exports = router;
