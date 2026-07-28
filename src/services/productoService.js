const Producto = require('../models/producto');

class ProductoService {
    async createProducto(data) {
        const nuevoProducto = new Producto(data);
        return await nuevoProducto.save();
    }

    async getProductos() {
        return await Producto.find();
    }

    async getProductoById(id) {
        return await Producto.findById(id);
    }

    async updateProducto(id, data) {
        return await Producto.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteProducto(id) {
        return await Producto.findByIdAndDelete(id);
    }
}

module.exports = new ProductoService();
