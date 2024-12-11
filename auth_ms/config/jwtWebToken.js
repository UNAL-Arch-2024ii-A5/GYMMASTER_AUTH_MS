const jwt = require("jsonwebtoken");
/*Generacion de un token que expira en 1d, con JWT*/
/*¿Por qué 1 día? solo se me ocurrio xd*/
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"1d"});
}
module.exports = {generateToken};