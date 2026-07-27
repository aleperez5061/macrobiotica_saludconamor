// src/controllers/respuestaController.js
const respuestaService = require('../services/respuestaService');

class RespuestaController {
    async create(req, res) {
        try {
            const respuesta = await respuestaService.registrarRespuesta(req.body);
            res.status(201).json(respuesta);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RespuestaController();