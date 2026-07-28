// src/controllers/rolController.js
const rolService = require('../services/rolService');

class RolController {
    async create(req, res) {
        try {
            const rol = await rolService.createRol(req.body);
            res.status(201).json(rol);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const roles = await rolService.getRoles();
            res.json(roles);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const rol = await rolService.getRolById(req.params.id);
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json(rol);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const rol = await rolService.updateRol(req.params.id, req.body);
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json(rol);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const rol = await rolService.deleteRol(req.params.id);
            if (!rol) {
                return res.status(404).json({ message: 'Rol no encontrado' });
            }
            res.json({ message: 'Rol eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new RolController();
