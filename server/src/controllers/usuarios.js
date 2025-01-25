
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, rol, estatus } = req.body;
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    try {
        const [resultado] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena, rol, estatus) VALUES (?, ?, ?, ?, ?)',
            [nombre, correo, contrasenaEncriptada, rol || 'cliente', estatus || 'activo']
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

        if (usuario.estatus === 'inactivo') {
            return res.status(403).json({ error: 'Usuario deshabilitado' });
        }

        const coincide = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!coincide) return res.status(401).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, 'clave_secreta', { expiresIn: '1h' });
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


module.exports = { registrarUsuario, iniciarSesion, mostrarUsuarios };
