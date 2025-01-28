const db = require('../config/db');

const crearOrden = async (req, res) => {
    const { idUsuario, idMetodoPago } = req.body;

    try {
        const [carrito] = await db.query(
            'SELECT c.id_producto, c.cantidad, p.precio FROM carrito c JOIN productos p ON c.id_producto = p.id WHERE c.id_usuario = ?',
            [idUsuario]
        );

        if (carrito.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

        const [resultadoOrden] = await db.query(
            'INSERT INTO ordenes (id_usuario, total, id_metodo_pago) VALUES (?, ?, ?)',
            [idUsuario, total, idMetodoPago]
        );
        const idOrden = resultadoOrden.insertId;

        for (const item of carrito) {
            await db.query(
                'INSERT INTO detalles_orden (id_orden, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)',
                [idOrden, item.id_producto, item.cantidad, item.precio]
            );
            await db.query('UPDATE productos SET stock = stock - ?, cantidadVendida = cantidadVendida + ? WHERE id = ?', [item.cantidad, item.cantidad, item.id_producto]);
        }

        await db.query('DELETE FROM carrito WHERE id_usuario = ?', [idUsuario]);
        res.status(201).json({ mensaje: 'Orden creada con éxito', idOrden });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerOrdenes = async (req, res) => {
    try {
        const [ordenes] = await db.query(
            'SELECT o.id, o.total, o.creado_en, u.nombre AS usuario, m.nombre AS metodo_pago FROM ordenes o JOIN usuarios u ON o.id_usuario = u.id JOIN metodos_pago m ON o.id_metodo_pago = m.id'
        );
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerDetallesOrden = async (req, res) => {
    const { id } = req.params;

    try {
        const [orden] = await db.query(
            'SELECT o.id, o.total, o.creado_en, u.nombre AS usuario, m.nombre AS metodo_pago FROM ordenes o JOIN usuarios u ON o.id_usuario = u.id JOIN metodos_pago m ON o.id_metodo_pago = m.id WHERE o.id = ?',
            [id]
        );

        if (orden.length === 0) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        const [detalles] = await db.query(
            'SELECT d.id_producto, p.nombre AS producto, d.cantidad, d.precio FROM detalles_orden d JOIN productos p ON d.id_producto = p.id WHERE d.id_orden = ?',
            [id]
        );

        res.json({ orden: orden[0], detalles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { crearOrden, obtenerOrdenes, obtenerDetallesOrden };
