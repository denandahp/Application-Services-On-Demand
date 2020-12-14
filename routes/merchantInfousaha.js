const Router = require('express').Router();
const merchantInfousaha = require('../controllers/merchantInfousaha.js');

Router.post('/register', merchantInfousaha.register)
      .post('/update', merchantInfousaha.update)
      .get('/byUsername/:username', merchantInfousaha.get)
      .get('/pendapatan/:peroption', merchantInfousaha.pendapatan);

module.exports = Router;