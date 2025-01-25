const jwt = require('jsonwebtoken');

function verificarToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Token no proporcionado'});
    }
    jwt.verify(token,'clave_secreta',(err,user)=>{
        if(err){
            return res.status(403).json({message: 'Token inválido'});
        }
        req.user = user;
        next();
    });
}

module.exports = verificarToken;