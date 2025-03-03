const express = require('express');
const { 
    createUser, loginUserCtrl, loginAdmin, loginCoach, updatedaUser, 
    forgotPasswordToken, resetPassword, updatePassword, getaUser, 
    getsUser, rating, deletesUser, deleteallUser 
} = require('../controller/userController');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();
const { authMiddleware, isAdmin, isCoach } = require("../middlewares/authMiddleware");

// 📌 Registro y autenticación
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/coach-login", loginCoach);
router.post("/validate-token", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    console.log("✅ Usuario validado en /validate-token:", user);
    res.json({ user });
  } catch (error) {
    console.error("🚨 Error al validar token:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});

// 📌 Recuperación de contraseña
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);

// 📌 Edición de usuario
router.put("/edit-user", authMiddleware, updatedaUser);

// 📌 Gestión de rutinas asignadas
router.patch("/:id/routines", authMiddleware, isCoach, async (req, res) => {
    const { id } = req.params;
    const { routineId } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.routines.push(routineId);
        await user.save();

        res.json({ message: "Rutina agregada al usuario", user });
    } catch (error) {
        console.error("Error en PATCH /users/:id/routines:", error);
        res.status(500).json({ message: "Error al actualizar rutinas del usuario" });
    }
});

// 📌 Gestión de usuarios
router.get("/all-users", getaUser);
router.get("/:id", authMiddleware, getsUser);
router.delete("/:id", deletesUser);
router.delete("/", deleteallUser);

// 📌 Calificaciones
router.put("/rating", authMiddleware, rating);

module.exports = router;
