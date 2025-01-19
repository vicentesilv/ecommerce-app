//dependencias
const express = require('express');
const bodyParser = require('body-parser');

//archivos de rutas
const usuariosRoutes = require('./routes/usuarios');
const productosRoutes = require('./routes/productos');
const ordenesRoutes = require('./routes/ordenes');

//conjfiguracion servidor
const app = express();
const puerto = 5000;
app.use(bodyParser.json());
//rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ordenes', ordenesRoutes);

app.use((req,res) => res.status(404).json({error: 'Ruta no encontrada'}));

module.exports = {
    app,
    puerto
};