
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    try {
        const [resultado] = await db.query(
            'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)',
            [nombre, correo, contrasenaEncriptada]
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

        const token = jwt.sign({ id: usuario.id }, 'clave_secreta', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registrarUsuario, iniciarSesion };
