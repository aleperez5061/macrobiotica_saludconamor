const Categoria = require('../models/categoria');

class CategoriaService {
    async createCategoria(data) {
        const nuevaCategoria = new Categoria(data);
        return await nuevaCategoria.save();
    }

    async getCategorias() {
        return await Categoria.find();
    }

    async getCategoriaById(id) {
        return await Categoria.findById(id);
    }

    async updateCategoria(id, data) {
        return await Categoria.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteCategoria(id) {
        return await Categoria.findByIdAndDelete(id);
    }
}

module.exports = new CategoriaService();