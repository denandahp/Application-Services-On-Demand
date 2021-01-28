const Router = require('express').Router();
const user = require('../controllers/merchantUser.js');

Router.post('/login', user.login)
      .post('/logout', user.logout)
      .post('/register', user.register)
      .post ('/register/verifikasiotp',user.verifikasiotp)
      .post ('/register/resendotp',user.resendotp)
      .post ('/verifikasiUser',user.verifikasiUser)
      .post ('/rekeningbank',user.rekeningbank)
      .post('/delete', user.delete)
      .post('/edit', user.edit)
      .get('/detail/:id_user', user.detail)
      .get('/userstatus/:id_user', user.userstatus)
      .get('/alluser/:role/:status', user.showAllUser)
      .get('/alldetail/:id_user', user.alldetail)
      .get('/listbank', user.listbank);

      
module.exports = Router;