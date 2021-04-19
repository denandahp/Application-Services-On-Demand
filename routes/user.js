const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const user = require('../controllers/user.js');
const home = require('../controllers/driverHomealt.js');
const order = require('../controllers/driverOrder.js');

Router.post('/login', user.login)
      .post('/renewAccessToken', user.renewAccessToken)
      .post('/register', user.register)
      .post('/register/registerlanjut', user.registerlanjut)
      .post('/register/verifikasiotp', user.verifikasiotp)
      .post('/register/resendotp', user.resendotp)
      .post('/verifikasiUser', user.verifikasiUser)
      .post('/searchingdata', user.searchingdata)
      .post('/delete', user.delete)
      .post('/edit', user.edit)
      .get('/detail/:id', user.detail)
      .get('/userstatus/:id', user.userstatus)
      .post('/logout', user.logout)
      .delete('/logout', user.logout)
      .get('/alluser/:role/:status', user.showAllUser)
      .get('/alluserbyschedule/:username', user.userbyschedule)
      .put('/isactive', auth, home.is_active)
      .put('/active', auth, home.active)
      .put('/nonactive', auth, home.nonactive)
      .put('/autobid', auth, home.autobid)
      .put('/activeautobid', auth, home.activeautobid)
      .put('/nonactiveautobid', auth, home.nonactiveautobid)
      .get('/homealt', auth, home.homealt)
      .get('/jfood/incomingorder/:kode', auth, order.incomingorder)
      .post('/jfood/acceptorder/:kode', auth, order.acceptorder)
      .get('/jfood/dataorder/:kode', auth, order.dataorder)
      .post('/jfood/rejectorder/:kode', auth, order.rejectorder)
      .put('/updatedatadriver', auth, order.updatedatadriver)
      .put('/jfood/verifikasi/:kode', auth, order.verifikasi)
      .put('/jfood/antarkanpesanan/:kode', auth, order.antarkanpesanan)
      .put('/jfood/selesaiantar/:kode', auth, order.selesaiantar)
      .put('/jfood/pesananselesai/:kode', auth, order.pesananselesai)

module.exports = Router;