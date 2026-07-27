const mongoose = require('mongoose');
const EmpleadoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    puesto: { type: String, required: true }
}, { collection: 'Empleados', versionKey: false });
module.exports = mongoose.model('Empleado', EmpleadoSchema);