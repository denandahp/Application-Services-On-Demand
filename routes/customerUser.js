const Router = require('express').Router();
const user = require('../controllers/customerUser.js');

Router.post('/login', user.login)
      .post('/register', user.register)
      .post('/register/registerlanjut', user.registerlanjut)
      .post ('/register/verifikasiotp',user.verifikasiotp)
      .post ('/register/resendotp',user.resendotp)
      .post ('/verifikasiUser',user.verifikasiUser)
      .post('/delete', user.delete)
      .post('/edit', user.edit)
      .post('/searchingdata', user.searchingdata)
      .post('/cekdatauser', user.checkdatauser)
      .PUT('/updatetokenfcm', user.updatetokenfcm)
      .get('/detail/:id', user.detail)
      .get('/userstatus/:id', user.userstatus)
      .post('/logout', user.logout)
      .get('/alluser/:role/:status', user.showAllUser);
      
module.exports = Router;