const BaseController = require('./../../common/base.controller')
const path = require("path")
const fs = require("fs")
const {
  to
} = require("await-to-js");
const {
  APIPaths
} = require('../../helpers/paths');
const { v4: uuidv4 } = require('uuid');
const directoryPath = "upload/photos";

module.exports = class ImageController  extends BaseController{
  constructor() {
    super("image", APIPaths.Image);
  }
  async uploadImage(req, res, next) {
    try {
      let {
        image_base64
      } = req.body;

      let base64Image = image_base64.split(';base64,').pop();
      let uniqueId = uuidv4();

      fs.writeFile(directoryPath + '/' + uniqueId + '.png', base64Image, {encoding: 'base64'}, function(err) {
        return res.status(200).json({status: 'success'});
      });
    } catch (error) {
      if (error && error.response && error.response.status == 403) {
        return this._redirectToForbidden(req, res, next);
      }
      return res.status(500).send(`Get all ${this._controllerName}s failed.`);
    }
  }
  async getAllImages(req, res, next) {
    try {
      fs.readdir(directoryPath, function(err, files) {
        if (err) {      
          return res.status(500).send(`Get all images failed.`);
        } 
        return res.status(200).json(files);
      })
    } catch (error) {
      if (error && error.response && error.response.status == 403) {
        return this._redirectToForbidden(req, res, next);
      }
      return res.status(500).send(`Get all ${this._controllerName}s failed.`);
    }
  }
};
