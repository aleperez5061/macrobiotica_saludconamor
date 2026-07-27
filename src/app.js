// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Importación de las rutas (Endpoints)
const clienteRoutes = require('./routes/clienteRoutes');
const encuestaRoutes = require('./routes/encuestaRoutes');
const respuestaRoutes = require('./routes/respuestaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();

// 1. Conectar a la base de datos MacrobioticaSaludConAmor
connectDB(); // Invoca la función definida en src/config/db.js [3]

// 2. Middleware para procesar datos JSON en las peticiones [3, 5]
app.use(bodyParser.json());

// 3. Registro de Rutas Base [2, 4]
// Cada una mapea las URLs que usarás en Postman
app.use('/api/clientes', clienteRoutes);
app.use('/api/encuestas', encuestaRoutes);
app.use('/api/respuestas', respuestaRoutes);
app.use('/api/reportes', reporteRoutes);

// 4. Configuración del puerto y encendido del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Sistema de Encuestas: Macrobiótica Salud con Amor listo para pruebas.');
});