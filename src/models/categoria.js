const mongoose = require('mongoose');
const CategoriaSchema = new mongoose.Schema({
    nombre_cat: { type: String, required: true }
}, { collection: 'Categorias', versionKey: false });
module.exports = mongoose.model('Categoria', CategoriaSchema);