const Router = require('express').Router();
const uploadImage = require('../controllers/uploadImage.js');

Router.post('/post', uploadImage.post)
      .post('/delete', uploadImage.delete)
      
module.exports = Router;