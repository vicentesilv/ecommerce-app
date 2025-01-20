const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const rutasUsuarios = require('./routes/usuarios');
const rutasProductos = require('./routes/productos');
const rutasOrdenes = require('./routes/ordenes');
const rutasCarrito = require('./routes/carro');

app.use('/api/usuarios', rutasUsuarios);
app.use('/api/productos', rutasProductos);
app.use('/api/ordenes', rutasOrdenes);
app.use('/api/carrito', rutasCarrito);

app.use((req, res) => res.status(404).send('Ruta no encontrada'));

module.exports = app;
