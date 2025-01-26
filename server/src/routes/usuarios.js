const express = require('express');
const router = express.Router();

const { registrarUsuario, iniciarSesion,mostrarUsuarios,eliminarUsuario,editarUsuario } = require('../controllers/usuarios');

const { verificarRol, verificarToken } = require('../middleware/middleware.verify');

//cualquier usuario puede registrarse
router.post('/registro',registrarUsuario);
router.post('/login', iniciarSesion);

//solo el admin 
router.get("/mostrarUsuarios", verificarToken, verificarRol("admin"), mostrarUsuarios);
router.delete("/eliminarUsuario/:id", verificarToken, verificarRol("admin"), eliminarUsuario);
router.put("/editarUsuario/:id", verificarToken, verificarRol("admin"), editarUsuario);

module.exports = router;