
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, rol, } = req.body;
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    try {
        const [resultado] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, contrasenaEncriptada, rol || 'cliente']
        );
        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const iniciarSesion = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        const usuario = usuarios[0];

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!coincide) return res.status(401).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol,nombre: usuario.nombre,correo: usuario.correo,fecha: usuario.	creado_en }, 'clave_secreta', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const mostrarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await db.query('SELECT * FROM usuarios');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message})        
    }
};

const eliminarUsuario = async(req,res) =>{
    const {id} = req.params;
    try{
        await db.query('DELETE FROM usuarios WHERE id = ?',[id]);
        // await db.query('DELETE FROM pedidos WHERE id_usuario = ?',[id]);
        // await db.query('DELETE FROM productos WHERE idVendedor = ?',[id]);
        res.json({mensaje: 'Usuario eliminado con éxito'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const {rol} = req.body;

    try {
        await db.query(
            'UPDATE usuarios SET rol = ?  WHERE id = ?',
            [ rol ]
        );
        res.json({ mensaje: 'Usuario actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarUsuario, iniciarSesion, mostrarUsuarios, eliminarUsuario,editarUsuario};
