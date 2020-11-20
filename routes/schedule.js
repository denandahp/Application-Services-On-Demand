const Router = require('express').Router();
const schedule = require('../controllers/schedule.js');

Router.post('/register', schedule.register)
      .post('/update', schedule.update)
      .get('/bySchedule/:username', schedule.get)
 

module.exports = Router;