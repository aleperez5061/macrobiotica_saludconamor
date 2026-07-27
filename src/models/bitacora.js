const mongoose = require('mongoose');
const BitacoraSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    accion: { type: String, required: true },
    hora: { type: String, default: () => new Date().toLocaleTimeString() }
}, { collection: 'Bitacora', versionKey: false });
module.exports = mongoose.model('Bitacora', BitacoraSchema);