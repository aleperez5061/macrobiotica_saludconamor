const Sucursal = require('../models/sucursal');

class SucursalService {
    async createSucursal(data) {
        const nuevaSucursal = new Sucursal(data);
        return await nuevaSucursal.save();
    }

    async getSucursales() {
        return await Sucursal.find();
    }

    async getSucursalById(id) {
        return await Sucursal.findById(id);
    }

    async updateSucursal(id, data) {
        return await Sucursal.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteSucursal(id) {
        return await Sucursal.findByIdAndDelete(id);
    }
}

module.exports = new SucursalService();
