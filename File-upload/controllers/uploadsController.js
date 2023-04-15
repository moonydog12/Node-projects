const path = require('path');
const { StatusCodes } = require('http-status-codes');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const CustomError = require('../errors');

const uploadProductImageLocal = async (req, res) => {
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded');
  }

  const productImage = req.files.image;

  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image');
  }

  // check size
  const maxSize = 1024 * 1024; // 1MB

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1kb',
    );
  }

  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`,
  );

  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  // Store the tmp image to the clodinary folder
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: 'file-upload' },
  );

  // Remove the temporary folder which used to store image
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
