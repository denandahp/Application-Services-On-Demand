const Router = require('express').Router();
const driver = require('../controllers/driverListOrder.js');

Router.get('/listorder', driver.listorder)
    .get('/listorderbydriver/:id', driver.listorderbydriver)
    .get('/jfood/detailorder/:kode', driver.detailorderjfood)
    .get('/jride/detailorder/:kode', driver.detailorderjride)
module.exports = Router;