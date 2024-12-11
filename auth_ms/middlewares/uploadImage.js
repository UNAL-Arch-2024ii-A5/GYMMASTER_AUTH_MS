const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fsExtra = require("fs-extra");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const outputPath = path.join(__dirname, `../public/images/products/${file.filename}`);

        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(outputPath);

        // Eliminar el archivo de manera asíncrona después de que se haya guardado correctamente
        await fsExtra.remove(outputPath);
      })
    );
  } catch (error) {
    console.error("Error al procesar las imágenes:", error);
  }

  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const outputPath = path.join(__dirname, `../public/images/blogs/${file.filename}`);

      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      // Eliminar el archivo de manera asíncrona después de que se haya guardado correctamente
      await fsExtra.remove(outputPath);
    })
  );

  next();
};

module.exports = { uploadPhoto, productImgResize, blogImgResize };
