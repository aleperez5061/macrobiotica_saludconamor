const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// GET http://localhost:5000/api/reportes/:encuestaId
// El ":encuestaId" es el parámetro dinámico que evita valores quemados [4].
router.get('/:encuestaId', reporteController.generate);

module.exports = router;