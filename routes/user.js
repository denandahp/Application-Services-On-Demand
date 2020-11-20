const Router = require('express').Router();
const user = require('../controllers/user.js');

Router.post('/login', user.login)
      .post('/register', user.register)
      .post('/register/registerlanjut', user.registerlanjut)
      .post ('/register/verifikasiotp',user.verifikasiotp)
      .post ('/register/resendotp',user.resendotp)
      .post ('/verifikasiUser',user.verifikasiUser)
      .post('/searchingdata', user.searchingdata)
      .post('/delete', user.delete)
      .post('/edit', user.edit)
      .get('/detail/:id', user.detail)
      .get('/userstatus/:id', user.userstatus)
      .get('/logout', user.logout)
      .get('/alluser/:role/:status', user.showAllUser);

module.exports = Router;