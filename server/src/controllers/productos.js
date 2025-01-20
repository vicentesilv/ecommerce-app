const db = require('../config/db');

const obtenerProductos = async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM productos');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    try {
        const [resultado] = await db.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, stock]
        );
        res.status(201).json({ mensaje: 'Producto creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerProductos, crearProducto };