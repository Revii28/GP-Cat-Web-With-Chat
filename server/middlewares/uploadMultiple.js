const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMultiple = asyncHandler(async (req, res, next) => {
  try {
    const images = req.files;
    // console.log(images);
    const imgUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto",
      });

      imgUrls.push(result.secure_url);
    }

    req.images = imgUrls;
    // console.log(req.images);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = uploadMultiple;
