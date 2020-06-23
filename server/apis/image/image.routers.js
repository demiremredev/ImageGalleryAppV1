const express = require("express");
const router = express.Router();
const ImageController = require('./image.controller')
const imageController = new ImageController();

router.route("/upload")
  .post(
    imageController.uploadImage.bind(imageController))

router.route("/get_all_images")
  .get(
    imageController.getAllImages.bind(imageController))
  

module.exports = router;
