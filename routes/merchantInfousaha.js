const Router = require('express').Router();
const merchantInfousaha = require('../controllers/merchantInfousaha.js');

Router.post('/register', merchantInfousaha.register)
      .post('/update', merchantInfousaha.update)
      .get('/byuser_id/:user_id', merchantInfousaha.get)
      .get('/pendapatan/:peroption', merchantInfousaha.pendapatan)

module.exports = Router;