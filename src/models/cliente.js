// ...existing code...
const mongoose = require('mongoose');
const ClienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tel: { type: String, required: true },
    correo: { type: String, required: true, unique: true }
}, { collection: 'Clientes', versionKey: false });

// ...existing code...
// ClienteSchema.index({ correo: 1 }); // Eliminado: evita índice duplicado
module.exports = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);
// ...existing code...