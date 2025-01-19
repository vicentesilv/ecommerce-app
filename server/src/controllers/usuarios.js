const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registro = async (req,res) => {
    const {name,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);

    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (name,email,password) VALUES (?,?,?)',
            [name,email,hashPassword]
        );
        res.status(201).json({ message: 'Usuario creado correctamente', id: result.insertId,name,email});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


const inicioSesion = async (req,res) => {
    const {email,password} = req.body;

    try {
        const [rows] = await db.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [email]
        );
        const user = rows[0];

        if(!user){
            return res.status(401).json({error: 'Credenciales incorrectas'});
        }
        const match = await bcrypt.compare(password,user.password);

        if(!match){
            return res.status(401).json({error: 'Credenciales incorrectas'});
        }

        const token = jwt.sign({id: user.id},"secret",{expiresIn: '1d'});

        res.status(200).json({token});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    registro,
    inicioSesion
}