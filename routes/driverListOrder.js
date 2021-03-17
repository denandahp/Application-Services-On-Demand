const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const driver = require('../controllers/driverListOrder.js');

Router.get('/driverlistorder', driver.driverlistorder)

module.exports = Router;