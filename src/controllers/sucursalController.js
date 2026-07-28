// src/controllers/sucursalController.js
const sucursalService = require('../services/sucursalService');

class SucursalController {
    async create(req, res) {
        try {
            const sucursal = await sucursalService.createSucursal(req.body);
            res.status(201).json(sucursal);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const sucursales = await sucursalService.getSucursales();
            res.json(sucursales);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const sucursal = await sucursalService.getSucursalById(req.params.id);
            if (!sucursal) {
                return res.status(404).json({ message: 'Sucursal no encontrada' });
            }
            res.json(sucursal);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const sucursal = await sucursalService.updateSucursal(req.params.id, req.body);
            if (!sucursal) {
                return res.status(404).json({ message: 'Sucursal no encontrada' });
            }
            res.json(sucursal);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const sucursal = await sucursalService.deleteSucursal(req.params.id);
            if (!sucursal) {
                return res.status(404).json({ message: 'Sucursal no encontrada' });
            }
            res.json({ message: 'Sucursal eliminada' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new SucursalController();
