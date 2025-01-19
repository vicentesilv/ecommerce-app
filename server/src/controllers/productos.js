const db = require('../config/db');

const listarProductos = async(res,req) =>{
    try{
        const [rows] = await db.query('SELECT * FROM productos');
        res.status(200).json(rows);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const mostrarProducto = async (req,res) => {
    const {name} = r.eq.params;
    try{
        const [rows] = await db.query(
            'SELECT * FROM productos WHERE name = ?',
            [name]
        );
        res.status(200).json(rows[0]);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const crearProducto = async (req,res) => {
    const {name,description,price,stock} = req.body;
    try{
        const [result] = await db.query(
            'INSERT INTO productos (name,description,price,stock) VALUES (?,?,?,?)',
            [name,description,price,stock]
        );
        res.status(201).json({ message: 'Producto creado correctamente', id: result.insertId,name,description,price,stock});
    }catch(error){
        res.status(500).json({error: error.message});       
    }
};

const editarProducto = async (req,res) => {
    const {id} = req.params;
    const {name,description,price,stock} = req.body;
    try{
        const [result] = await db.query(
            'UPDATE productos SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name,description,price,stock,id]
        );
        res.status(200).json({ message: 'Producto actualizado correctamente', id: result.insertId,name,description,price,stock});
    }catch(error){
        res.status(500).json({error: error.message});       
    }
};

const eliminarProducto = async (req,res) => {
    const {id} = req.params;
    try{
        const [result] = await db.query(
            'DELETE FROM productos WHERE id = ?',
            [id]
        );
        res.status(200).json({ message: 'Producto eliminado correctamente', id: result.insertId});
    }catch(error){
        res.status(500).json({error: error.message});       
    }
};

module.exports = {
    listarProductos,
    mostrarProducto,
    crearProducto,
    editarProducto,
    eliminarProducto
};