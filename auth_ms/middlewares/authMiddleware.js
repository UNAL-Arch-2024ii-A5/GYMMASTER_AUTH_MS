const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
/*Validar el usuario en la base de datos*/
const authMiddleware=asyncHandler(async(req,res,next) =>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }

        }catch (error){
            res.status(401).json({ message: 'El token ha expirado, por favor entre de nuevo' });
        }
    }else{
        res.status(401).json({ message: "No hay un token" });    
    }
})
/*Validar si es admin*/
const isAdmin = asyncHandler(async(req, res, next)=>{
    const{email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !=="admin"){
        throw new Error("No eres admin");
    }else{
        next();
    }
});
/*Validar si es coach*/
const isCoach = asyncHandler(async(req, res, next)=>{
    const{email} = req.user;
    const CoachUser = await User.findOne({email});
    if(CoachUser.role !=="Coach"){
        throw new Error("No eres un coach");
    }else{
        next();
    }
});
const isCoachGraphQL = async (bearerToken) => {
    try {
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        if (!user || user.role !== "Coach") {
            throw new Error("No tienes permisos para asignar rutinas.");
        }
        return user;
    } catch (error) {
        throw new Error("Autenticación fallida: " + error.message);
    }
};
const machineAccessMiddleware = asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;

    if (userRole === "admin") {
        return next(); // Admin tiene acceso total
    }

    if (userRole === "user" || userRole === "coach") {
        if (req.method === "PATCH" && req.path.startsWith("/use/")) {
            return next(); // User y Coach pueden usar la máquina
        } else {
            return res.status(403).json({ message: "No tienes permisos para realizar esta acción en máquinas" });
        }
    }

    return res.status(403).json({ message: "Acceso denegado" });
});
const routinesAccessMiddleware = asyncHandler(async (req, res, next) => {
    const userRole = req.user.role;

    if (userRole === "admin" || userRole === "coach") {
        return next(); // Admin y Coach pueden hacer todo
    }

    if (userRole === "user" && req.method === "GET") {
        return next(); // User solo puede ver sus rutinas asignadas
    }

    return res.status(403).json({ message: "No tienes permisos para realizar esta acción en rutinas" });
});


module.exports={authMiddleware, isAdmin, isCoach, isCoachGraphQL, machineAccessMiddleware, routinesAccessMiddleware};