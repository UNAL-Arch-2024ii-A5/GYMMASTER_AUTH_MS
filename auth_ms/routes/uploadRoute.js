const express = require('express');
const { uploadImages, deleteImages } = require('../controller/uploadCtrl');
const { isAdmin, isCoach, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');
const router = express.Router();
module.exports = router

// Ruta para la carga de imágenes de administradores
router.post('/admin-upload', authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);

// Ruta para la carga de imágenes de fundaciones
/*router.post('/Coach-upload', authMiddleware, isCoach, uploadPhoto.array("images", 10), productImgResize, uploadImages);*/

router.delete('/delete-img-admin/:id', authMiddleware, isAdmin, deleteImages);
router.delete('/delete-img-coach/:id', authMiddleware, isCoach, deleteImages);

module.exports = router;
