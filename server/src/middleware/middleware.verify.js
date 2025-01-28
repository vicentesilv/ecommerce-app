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


const verificarRolRuta = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // El JWT se espera en el header "Authorization: Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Decodificar el JWT
        const decoded = jwt.verify(token, "clave_secreta");
        const { rol } = decoded;

        // Validar el rol y devolver la ruta correspondiente
        switch (rol) {
            case 'admin':
                return res.json({ ruta: '/adminUsuarios' });
            case 'vendedor':
                return res.json({ ruta: '/vendedor' });
            default:
                return res.status(403).json({ error: 'Rol no autorizado' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
    

module.exports = { verificarToken, verificarRol, verificarRolRuta };