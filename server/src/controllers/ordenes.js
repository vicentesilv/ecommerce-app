const db = require("../config/db");

const crearOrden = async (req, res) => {
  const { userId, items } = req.body; // items será un array de { productId, quantity }
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'LOS PRODUCTOS SON REQUERIDOS PARA CREAR UNA ORDEN.' });
    }

    try {
        // Calcular el total de la orden
        let total = 0;
        for (const item of items) {
            const [product] = await db.query('SELECT price FROM productos WHERE id = ?', [item.productId]);
            if (!product.length) {
                return res.status(404).json({ error: `PRODUCTO CON ID${item.productId} no ENCONTRADO.` });
            }
            total += product[0].price * item.quantity;
        }

        // Crear la orden
        const [orderResult] = await db.query('INSERT INTO ordenes (user_id, total) VALUES (?, ?)', [userId, total]);

        // Insertar los detalles de la orden
        const orderId = orderResult.insertId;
        for (const item of items) {
            const [product] = await db.query('SELECT price FROM productos WHERE id = ?', [item.productId]);
            await db.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.productId, item.quantity, product[0].price]
            );

            // Actualizar el stock del producto
            await db.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [item.quantity, item.productId]);
        }

        res.status(201).json({ message: 'ORDEN CREADA CORRECTAMENTE', orderId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const mostrarOrdenes = async (req, res) => {
  try {
    const [rows] = await db.query(
        "SELECT o.id, o.total, u.name as user_name FROM ordenes o JOIN usuarios u ON o.user_id = u.id"
    );
    res.status(200).json(rows);
} catch (error) {
    res.status(500).json({ error: error.message });
}
};

const mostrarOrden = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "SELECT o.id, o.total, u.name as user_name FROM ordenes o JOIN usuarios u ON o.user_id = u.id WHERE o.id = ?",
            [id]
        );
        if (!rows.length) {
            return res.status(404).json({ error: `ORDEN CON ID ${id} NO ENCONTRADA.` });
        }
        const [orderItems] = await db.query(
            "SELECT p.name as product_name, oi.quantity, oi.price FROM order_items oi JOIN productos p ON oi.product_id = p.id WHERE oi.order_id = ?",
            [id]
        );
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearOrden,
    mostrarOrdenes,
    mostrarOrden
}