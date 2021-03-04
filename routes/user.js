const Router = require('express').Router();
const auth = require('../middleware/auth.js');
const user = require('../controllers/user.js');

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
      .get('/alluser/:role/:status', user.showAllUser)
      .get('/alluserbyschedule/:username', user.userbyschedule)
      .put('/isactive', auth, user.is_active)
      .put('/active', auth, user.active)
      .put('/nonactive', auth, user.nonactive)
      .put('/autobid', auth, user.autobid)
      .put('/activeautobid', auth, user.activeautobid)
      .put('/nonactiveautobid', auth, user.nonactiveautobid)
      .get('/homealt', auth, user.homealt)
      .get('/incomingorder/:kode', auth, user.incomingorder)
      .post('/acceptorder/:kode', auth, user.acceptorder)
      .get('/dataorder/:kode', auth, user.dataorder)
      .post('/rejectorder/:kode', auth, user.rejectorder)
      .put('/updatedatadriver', user.updatedatadriver)
// .post('/terima/:kode', auth, user.orderan)
// .get('/allorderhistory', auth, user.allorderhistory);
// .get('/lastorder', auth, user.lastorder);

module.exports = Router;