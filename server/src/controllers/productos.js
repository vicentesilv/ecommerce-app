const db = require('../config/db');
const path = require('path');
const fs = require('fs');

const obtenerProductos = async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM productos');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const mostrarImagen = (req, res) => {
    const { nombreImagen } = req.params;
    const ruta = path.join(__dirname, '../imagenes', nombreImagen);

    fs.access(ruta, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.sendFile(ruta);
    });
};

const obtenerProducto = async(req,res) =>{
    const {nombre} = req.params;
    try {
        const [producto] = await db.query('SELECT * FROM productos WHERE nombre LIKE ?', [`%${nombre}%`]);
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearProducto = async (req, res) => {
    const { idVendedor, nombre, descripcion, precio, stock, categoria } = req.body;

    // Verificar si se subió un archivo
    if (!req.files || !req.files.imagen) {
        return res.status(400).json({ error: 'La imagen es requerida.' });
    }

    const imagen = req.files.imagen;
    const nombreArchivo = Date.now() + '-' + imagen.name;
    const rutaImagen = path.join(__dirname, '../imagenes', nombreArchivo);

    try {
        // Guardar la imagen en el servidor
        await imagen.mv(rutaImagen);

        // Insertar el producto en la base de datos
        const [resultado] = await db.query(
            'INSERT INTO productos (idVendedor, nombre, descripcion, precio, stock, imagen,categoria) VALUES (?, ?, ?, ?, ?, ?)',
            [idVendedor, nombre, descripcion, precio, stock, nombreArchivo,categoria]
        );

        res.status(201).json({ mensaje: 'Producto creado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const mostrarProductosVendedor = async (req, res) => {
    const { idVendedor } = req.params;

    try {
        const [productos] = await db.query(
            'SELECT * FROM productos WHERE idVendedor = ?',
            [idVendedor]
        );
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    try {
        await db.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?,categoria = ?  WHERE id = ?',
            [nombre, descripcion, precio, stock, categoria,id]
        );
        res.json({ mensaje: 'Producto actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerProductos,obtenerProducto, crearProducto, mostrarImagen,editarProducto,mostrarProductosVendedor,eliminarProducto };
