const Router = require('express').Router();
const merchantInfopemilik = require('../controllers/merchantInfopemilik.js');

Router.post('/register', merchantInfopemilik.register)
      .post('/update', merchantInfopemilik.update)
      
module.exports = Router;