// src/controllers/empleadoController.js
const empleadoService = require('../services/empleadoService');

class EmpleadoController {
    async create(req, res) {
        try {
            const empleado = await empleadoService.createEmpleado(req.body);
            res.status(201).json(empleado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            const empleados = await empleadoService.getEmpleados();
            res.json(empleados);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const empleado = await empleadoService.getEmpleadoById(req.params.id);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.json(empleado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const empleado = await empleadoService.updateEmpleado(req.params.id, req.body);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.json(empleado);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const empleado = await empleadoService.deleteEmpleado(req.params.id);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.json({ message: 'Empleado eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new EmpleadoController();
