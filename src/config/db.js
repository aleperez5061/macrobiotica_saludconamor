// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://macrobiotica_team:Macrobiotica2026@ac-ytefmyd-shard-00-00.vizmwrf.mongodb.net:27017,ac-ytefmyd-shard-00-01.vizmwrf.mongodb.net:27017,ac-ytefmyd-shard-00-02.vizmwrf.mongodb.net:27017/DatosNoSQL?ssl=true&replicaSet=atlas-2daljo-shard-0&authSource=admin&retryWrites=true&w=majority&appName=MacrobioticaCluster');
        console.log('MongoDB Atlas: conexión exitosa');
    } catch (err) {
        console.error('Error de conexión a MongoDB Atlas:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;