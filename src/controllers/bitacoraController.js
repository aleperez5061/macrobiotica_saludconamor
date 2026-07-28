// src/controllers/bitacoraController.js
const bitacoraService = require('../services/bitacoraService');

class BitacoraController {
    async create(req, res) {
        try {
            const registro = await bitacoraService.createBitacora(req.body);
            res.status(201).json(registro);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const registros = await bitacoraService.getBitacoras();
            res.json(registros);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const registro = await bitacoraService.getBitacoraById(req.params.id);
            if (!registro) {
                return res.status(404).json({ message: 'Registro no encontrado' });
            }
            res.json(registro);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new BitacoraController();
