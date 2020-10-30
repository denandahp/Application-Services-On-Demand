const debug = require('debug')('app:controller:user');
const authUtils = require('./authUtils.js');
const user = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../configs.json');
const sendWAUtils = require('./sendWAUtils.js');
const maxAge = 1 * 24 * 60 * 60;

class UserController {
  async showAllUser (req, res) {
    let users = (await user.get()).rows;

    res.render('index', {
      users
    });
  }

  async detail (req, res, next) {
    let callback = async() =>{
      try {
        res.locals.edit = true;
        let id = req.params.id;
        debug('detail %o', id);
        let detail = (await user.get(id)).rows[0];

        res.status(200).json({
          detail
        });
      }catch (e) {
        next(e.detail || e);
      }
    };
    let fallback = (err) => {
      next(err);
    }
    authUtils.processRequestWithJWT(req, callback, fallback);
  }

  async edit (req, res, next) {
    let callback = async () => {
      let data = req.body;
      try {
        let result = (await user.edit(data)).rows[0];
        console.log(result);
        res.status(200).json({
          result
        });
      } catch (e) {
        console.log(e);
        let errorResponse = authUtils.processLoginError(e);
        res.status(400).json({
          errorResponse
        });
      }
    };
    let fallback = (err) => {
      console.log(err);
      next(err);
    }
    authUtils.processRequestWithJWT(req, callback, fallback);
  }

  async login (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    
    try {
      let result = await user.login(username, password);
      let token = jwt.sign({ data: result }, config.secret, {
        expiresIn: -1
      });
      res.cookie('jwt', token, { httpOnly: true, maxAge: -1 });
      res.status(200).json({
        pesan: "Berhasil login",
        userData: result
      });

    } catch (e) {
      let errorResponse = authUtils.processLoginError(e);
      res.status(400).json(errorResponse);
    }
  } 

  async logout (req, res, next) {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Cookie cleared' });
  }

  async delete (req, res, next) {
    let id = req.body.id;

    try {
      let result = (await user.delete({id}));
      res.status(200).json({
        pesan : "Berhasil dihapus",
        result
      });
    } catch (e) {
      res.status(400).json({
        pesan: "Terdapat Error",
        e
      })
    }
  }
  
  async verifikasiotp (req,res,next){
    let kodeOTP = req.body.otp;
    try{
    let result = await user.verifikasiotp(kodeOTP);
    res.status(200).json(
      {
        pesan : "OTP telah terverifikasi"
      }
    )
  } catch (e) {
    next(e.detail);
  }
}

async verifikasiUser (req,res,next){
  let statusUserUpdate = req.body;
  try{
  let result = await user.verifikasiUser(statusUserUpdate);
  res.status(200).json(
    {
      pesan : "User Telah Aktif"
    }
  )
} catch (e) {
  next(e.detail);
}
}

  async register (req, res, next) {
    let data = req.body;
    try {
      let result = await user.register(data);
      // let response = await sendWAUtils.sendWAMessage(result);
      // if (response.status == 200){
        res.status(200).json(
          {
            pesan : "berhasil didaftarkan", 
            userData: result, 
          }
        );
      //}
    } catch (e) {
      next(e.detail);
    }
  }

}

module.exports = new UserController();