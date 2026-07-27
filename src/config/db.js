// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Conexión a la base de datos del proyecto grupal
        await mongoose.connect('mongodb://localhost:27017/MacrobioticaSaludConAmor');
        console.log('MongoDB: Conexión exitosa a Macrobiótica Salud con Amor');
    } catch (err) {
        // Muestra el error en consola y detiene el proceso si falla la conexión
        console.error('Error de conexión:', err.message);
        process.exit(1);
    }
};
module.exports = connectDB;