const express = require('express');
const { uploadImages, deleteImages } = require('../controller/uploadCtrl');
const { isAdmin, isFoundation, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage');
const router = express.Router();
module.exports = router

// Ruta para la carga de imágenes de administradores
router.post('/admin-upload', authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);

// Ruta para la carga de imágenes de fundaciones
/*router.post('/foundation-upload', authMiddleware, isFoundation, uploadPhoto.array("images", 10), productImgResize, uploadImages);*/

router.delete('/delete-img-admin/:id', authMiddleware, isAdmin, deleteImages);
router.delete('/delete-img-foundation/:id', authMiddleware, isFoundation, deleteImages);

module.exports = router;
