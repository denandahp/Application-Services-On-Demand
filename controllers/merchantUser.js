const debug = require('debug')('app:controller:merchantUser');
const authUtils = require('./authUtils.js');
const user = require('../models/merchantUser.js');
const jwt = require('jsonwebtoken');
const config = require('../configs.json');
//const sendWAUtils = require('./sendWAUtils.js');
const sendSMSUtils = require('./sendSMSUtils.js');
const convimage = require('./convimage.js');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');
const maxAge = 1 * 24 * 60 * 60;

class UserController {
  async showAllUser (req, res) {
    res.locals.edit = true;
    let role = req.params.role;
    let status = req.params.status;
    let users = (await user.showAllUser(role, status)).rows;

    res.status(200).json({
      users
    });
  }

  
  async detail (req, res, next) {
    let callback = async() =>{
      try {
        res.locals.edit = true;
        let id_user = req.params.id_user;
        debug('detail %o', id_user);
        let detail = (await user.get(id_user)).rows[0];

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

  async userstatus (req, res, next) {
    let callback = async() =>{
      try {
        res.locals.edit = true;
        let id_user = req.params.id_user;
        debug('detail %o', id_user);
        let detail = (await user.userstatus(id_user)).rows[0];

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
        userData: result.user,
        restaurant : result.restaurant,
        token : token
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
    let id_user = req.body.id_user;

    try {
      let result = (await user.delete({id_user}));
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
    let id = req.body.id;
    let otp_id = req.body.otp_id;
    try{
    let result = await user.verifikasiotp(kodeOTP,id, otp_id);
    if(result.status == "400"){
      res.status(400).json(
        {
          pesan : "Registrasi Gagal ada error di system",
          error : result.error
        }
      );
    }else{
      res.status(200).json(
        {
          pesan : "OTP telah terverifikasi",
          result
        }
      )
    }
  } catch (e) {
    next(e.detail);
  }
}

  async resendotp (req,res,next){
    let data = req.body;
    try{
      let checkphone = await sendSMSUtils.checkphone(data);
      console.log(checkphone.status);
      if(checkphone.status == 404){
        console.log("checkphone.status");
        res.status(400).json({
          status : 'Coba periksa kembali nomor handphone yang dimasukkan. Sepertinya ada yg keliru.'
        });
      }
      else{
        var randomOTP = totp.now(); // => generate OTP
        let result = await user.resendotp(data,randomOTP);
        if(result.status == "400"){
          res.status(400).json(
            {
              pesan : "Registrasi Gagal ada error di system",
              error : result.error
            }
          );
        }else{
          let responsesms = await sendSMSUtils.sendSMSMessage(checkphone.phoneNumber,randomOTP,res);
          res.status(200).json(
            {
              pesan : "OTP telah diperbaharui",
              userData: result.user,
              otpData: result.otp
            }
          );
        }

      }
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
        pesan : "User Merchant Telah Aktif",
        user : result.user,
        restaurant : result.restaurant
      }
    )
  } catch (e) {
    next(e.detail);
  }
  }

  async register (req, res, next) {

    let data = req.body;
    try {
      var randomOTP = totp.now(); // => generate OTP
      let checkregistrasi = await user.checkregistrasi(data, randomOTP);
      if (checkregistrasi.status == '200'){
        let checkphone = await sendSMSUtils.checkphone(data);
        console.log(checkphone.status);
        if(checkphone.status == 404){
          console.log("checkphone.status");
          res.status(400).json({
            status : 'Coba periksa kembali nomor handphone yang dimasukkan. Sepertinya ada yg keliru.'
          });
        }
        else{
          let responsesms = await sendSMSUtils.sendSMSMessage(checkphone.phoneNumber,randomOTP,res);
          res.status(200).json(
            {
              pesan : "User belum verifikasi OTP", 
              userData: checkregistrasi.data,
              otp: checkregistrasi.otp
            }
          );
        }

      }else{
        let checkdatauser = await user.checkdatauser(data);
        if(checkdatauser.status == '400'){
          res.status(400).json({
            status : checkdatauser.errors
          });
        }
        else {
            let checkphone = await sendSMSUtils.checkphone(data);
            console.log(checkphone.status);
            if(checkphone.status == 404){
              console.log("checkphone.status");
              res.status(400).json({
                status : 'Coba periksa kembali nomor handphone yang dimasukkan. Sepertinya ada yg keliru.'
              });
            }
            else{
              let result = await user.register(data,randomOTP);
              if(result.status == "400"){
                res.status(400).json(
                  {
                    pesan : "Registrasi Gagal ada error di system",
                    error : result.error
                  }
                );
              }else{
                let responsesms = await sendSMSUtils.sendSMSMessage(checkphone.phoneNumber,randomOTP,res);
                res.status(200).json(
                  {
                    pesan : "Registrasi Merchant selesai, menunggu verifikasi OTP", 
                    userData: result.user,
                    otpData: result.otp
                  }
                );
              }
            }
          }
      }

      //  }
    } catch (e) {
      res.status(400).json('Registrasi Gagal !');
    }
  }

  async rekeningbank (req,res,next){
    let data = req.body;
    try{
    let result = await user.rekeningbank(data);
    res.status(200).json(
      {
        pesan : "Rekening bank telah didaftarkan",
        result
      }
    )
  } catch (e) {
    next(e.detail);
  }
}

  async listbank (req, res, next) {
    let callback = async() =>{
      try {
        res.locals.edit = true;
        let detail = await user.listbank();

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

  async alldetail (req, res, next) {
    let callback = async() =>{
      try {
        res.locals.edit = true;
        let user_id = req.params.user_id;
        debug('detail %o', user_id);
        let detail = (await user.alldetail(user_id)).rows;

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

}

module.exports = new UserController();