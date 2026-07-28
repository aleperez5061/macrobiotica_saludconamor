const Rol = require('../models/rol');

class RolService {
    async createRol(data) {
        const nuevoRol = new Rol(data);
        return await nuevoRol.save();
    }

    async getRoles() {
        return await Rol.find();
    }

    async getRolById(id) {
        return await Rol.findById(id);
    }

    async updateRol(id, data) {
        return await Rol.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteRol(id) {
        return await Rol.findByIdAndDelete(id);
    }
}

module.exports = new RolService();
