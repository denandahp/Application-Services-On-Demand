const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const driver = require('../controllers/driverListOrder.js');

Router.get('/jfood/driverlistorder', driver.driverlistorder)
    .get('/jfood/listorderbydriver/:id', driver.listorderbydriver)
    .get('/jfood/detailorder/:kode', driver.detailorder)
    .get('/jride/driverlistorder', driver.driverlistorderjride)
    .get('/jride/listorderbydriver/:id', driver.listorderbydriverjride)
    .get('/jride/detailorder/:kode', driver.detailorderjride)

module.exports = Router;