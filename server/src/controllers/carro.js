const db = require('../config/db');

const agregarAlCarrito = async (req, res) => {
    const { idUsuario, idProducto, cantidad } = req.body;

    try {
        const [itemExistente] = await db.query(
            'SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?',
            [idUsuario, idProducto]
        );

        if (itemExistente.length > 0) {
            await db.query(
                'UPDATE carrito SET cantidad = cantidad + ? WHERE id_usuario = ? AND id_producto = ?',
                [cantidad, idUsuario, idProducto]
            );
        } else {
            await db.query(
                'INSERT INTO carrito (id_usuario, id_producto, cantidad) VALUES (?, ?, ?)',
                [idUsuario, idProducto, cantidad]
            );
        }
        res.status(200).json({ mensaje: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerCarrito = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const [carrito] = await db.query(
            'SELECT c.id, c.cantidad, p.nombre, p.precio FROM carrito c JOIN productos p ON c.id_producto = p.id WHERE c.id_usuario = ?',
            [idUsuario]
        );
        res.json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarDelCarrito = async (req, res) => {
    const { idCarrito } = req.params;

    try {
        // Primero obtenemos la cantidad del producto en el carrito
        const [producto] = await db.query('SELECT cantidad FROM carrito WHERE id = ?', [idCarrito]);
        
        // Si no encontramos el producto
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
        }
        console.log(producto);

        // Si la cantidad es menor o igual a 0, eliminamos el producto
        if (parseInt(producto[0].cantidad) <= 1) {
            console.log("se cumple");
            await db.query('DELETE FROM carrito WHERE id = ?', [idCarrito]);
            return res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
        }else{
            console.log("no se cumple");
            await db.query('UPDATE carrito SET cantidad = cantidad - 1 WHERE id = ?', [idCarrito]);
            return res.status(200).json({ mensaje: 'Cantidad del producto reducida en 1' });
        }

        // Si la cantidad es mayor a 0, restamos 1 de la cantidad
     

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const vaciarCarrito = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        await db.query('DELETE FROM carrito WHERE id_usuario = ?', [idUsuario]);
        res.status(200).json({ mensaje: 'Carrito vaciado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito, vaciarCarrito };
