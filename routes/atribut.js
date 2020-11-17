const Router = require('express').Router();
const atribut = require('../controllers/atribut.js');

Router.post('/register', atribut.register)
      .post('/update', atribut.update)
      .get('/byatribut/:username', atribut.get)


module.exports = Router;