const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const driver = require('../controllers/driverListOrder.js');

Router.get('/driverlistorder', driver.driverlistorder)
    .get('/listorderbydriver/:id', driver.listorderbydriver)

module.exports = Router;