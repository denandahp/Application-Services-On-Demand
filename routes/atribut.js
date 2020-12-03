const Router = require('express').Router();
const atribut = require('../controllers/atribut.js');

Router.post('/atribut/register', atribut.register)
      .post('/atribut/update', atribut.update)
      .get('/byatribut/:username', atribut.get)


module.exports = Router;