const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const driver = require('../controllers/driverRideOrder.js');

Router.get('/incomingorder/:kode', auth, driver.incomingorder)
    .post('/acceptorder/:kode', auth, driver.acceptorder)
    .post('/rejectorder/:kode', auth, driver.rejectorder)

module.exports = Router;