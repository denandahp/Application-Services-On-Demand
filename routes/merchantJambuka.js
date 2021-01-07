const Router = require('express').Router();
const merchantJambuka = require('../controllers/merchantJambuka.js');

Router.post('/register', merchantJambuka.register)
      .post('/update', merchantJambuka.update)
      .post('/closedresto', merchantJambuka.closedresto)
      .get('/byUser_id/:id', merchantJambuka.get)
      
module.exports = Router;