const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const driver = require('../controllers/driverRideOrder.js');

Router.get('/incomingorder/:kode', auth, driver.incomingorder)
    .post('/acceptorder/:kode', auth, driver.acceptorder)
    .post('/rejectorder/:kode', auth, driver.rejectorder)
    .get('/dataorder/:kode', auth, driver.dataorder)
    .put('/telahdenganpenumpang/:kode', auth, driver.telahdenganpenumpang)
    .put('/selesaiantar/:kode', auth, driver.selesaiantar)

module.exports = Router;