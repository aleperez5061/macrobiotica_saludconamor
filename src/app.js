// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Importación de las rutas (Endpoints) — ya existentes
const clienteRoutes = require('./routes/clienteRoutes');
const encuestaRoutes = require('./routes/encuestaRoutes');
const respuestaRoutes = require('./routes/respuestaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

// Importación de las rutas nuevas
const categoriaRoutes = require('./routes/categoriaRoutes');
const rolRoutes = require('./routes/rolRoutes');
const sucursalRoutes = require('./routes/sucursalRoutes');
const productoRoutes = require('./routes/productoRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const bitacoraRoutes = require('./routes/bitacoraRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// 1. Conectar a la base de datos MacrobioticaSaludConAmor
connectDB(); // Invoca la función definida en src/config/db.js [3]

// 2. Middleware para procesar datos JSON en las peticiones [3, 5]
app.use(bodyParser.json());
app.use(express.static('public'));

// 3. Registro de Rutas Base [2, 4]
// Cada una mapea las URLs que usarás en Postman
app.use('/api/clientes', clienteRoutes);
app.use('/api/encuestas', encuestaRoutes);
app.use('/api/respuestas', respuestaRoutes);
app.use('/api/reportes', reporteRoutes);

// Rutas nuevas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/bitacora', bitacoraRoutes);
app.use('/api/feedback', feedbackRoutes);

// 4. Configuración del puerto y encendido del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('Sistema de Encuestas: Macrobiótica Salud con Amor listo para pruebas.');
});