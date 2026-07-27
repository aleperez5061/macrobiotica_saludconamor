const mongoose = require('mongoose');
const SucursalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true }
}, { collection: 'Sucursales', versionKey: false });
module.exports = mongoose.model('Sucursal', SucursalSchema);