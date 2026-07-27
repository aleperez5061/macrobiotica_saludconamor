const mongoose = require('mongoose');
const RolSchema = new mongoose.Schema({
    rol: { type: String, required: true },
    permisos: [{ type: String }] // Array de permisos según el avance [4]
}, { collection: 'Roles', versionKey: false });
module.exports = mongoose.model('Rol', RolSchema);