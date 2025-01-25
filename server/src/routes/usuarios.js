const express = require('express');
const router = express.Router();

const { registrarUsuario, iniciarSesion,mostrarUsuarios } = require('../controllers/usuarios');
const verificarToken = require('../config/middleware');

router.post('/registro',registrarUsuario);
router.post('/login', iniciarSesion);


router.get("/mostrarUsuarios", verificarToken, mostrarUsuarios);


module.exports = router;