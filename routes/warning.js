const Router = require('express').Router();
const warning = require('../controllers/warning.js');

Router.post('/add', warning.add)
      .post('/update', warning.update)
      .get('/Warning/:warning_id', warning.get)
 

module.exports = Router;