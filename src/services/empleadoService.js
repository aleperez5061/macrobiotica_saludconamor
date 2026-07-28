const Empleado = require('../models/empleado');

class EmpleadoService {
    async createEmpleado(data) {
        const nuevoEmpleado = new Empleado(data);
        return await nuevoEmpleado.save();
    }

    async getEmpleados() {
        return await Empleado.find();
    }

    async getEmpleadoById(id) {
        return await Empleado.findById(id);
    }

    async updateEmpleado(id, data) {
        return await Empleado.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteEmpleado(id) {
        return await Empleado.findByIdAndDelete(id);
    }
}

module.exports = new EmpleadoService();
