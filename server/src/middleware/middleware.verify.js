const jwt = require('jsonwebtoken');

// Middleware para verificar token
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token requerido.' });
    }

    jwt.verify(token, "clave_secreta", (err, user) => {
        if (err) return res.status(403).json({ mensaje: 'Token inválido.' });

        req.user = user; // Guardar datos del usuario en la petición
        next();
    });
}

// Middleware para verificar rol
function verificarRol(role) {
    return (req, res, next) => {
        if (req.user.rol !== role) {
            return res.status(403).json({ mensaje: 'Acceso denegado. Rol insuficiente.' });
        }
        next();
    };
}

module.exports = { verificarToken, verificarRol };
