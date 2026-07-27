const mongoose = require('mongoose');
const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    marca: { type: String, required: true }
}, { collection: 'Productos', versionKey: false });
module.exports = mongoose.model('Producto', ProductoSchema);