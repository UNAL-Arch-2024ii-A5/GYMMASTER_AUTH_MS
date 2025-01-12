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
/*Validar si es fundación*/
const isCoach = asyncHandler(async(req, res, next)=>{
    const{email} = req.user;
    const CoachUser = await User.findOne({email});
    if(CoachUser.role !=="Coach"){
        throw new Error("No eres una fundación");
    }else{
        next();
    }
});
module.exports={authMiddleware, isAdmin, isCoach};