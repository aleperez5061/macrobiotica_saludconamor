const express = require('express');
const router = express.Router();
const encuestaController = require('../controllers/encuestaController');

router.post('/', encuestaController.create);
router.get('/', encuestaController.getAll);

module.exports = router;