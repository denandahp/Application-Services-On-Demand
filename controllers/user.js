const debug = require('debug')('app:controller:user');
const authUtils = require('./authUtils.js');
const user = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../configs.json');
const sendWAUtils = require('./sendWAUtils.js');
const sendSMSUtils = require('./sendSMSUtils.js');
const convimage = require('./convimage.js');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');
const maxAge = 1 * 24 * 60 * 60;

class UserController {
  async showAllUser(req, res) {
    res.locals.edit = true;
    let role = req.params.role;
    let status = req.params.status;
    let users = (await user.showAllUser(role, status)).rows;

    res.status(200).json({
      users
    });
  }

  async userbyschedule(req, res) {
    res.locals.edit = true;
    let username = req.params.username;
    let users = (await user.userbyschedule(username)).rows;

    res.status(200).json({
      users
    });
  }

  async detail(req, res, next) {
    let callback = async () => {
      try {
        res.locals.edit = true;
        let id = req.params.id;
        debug('detail %o', id);
        let detail = (await user.get(id)).rows[0];

        res.status(200).json({
          detail
        });
      } catch (e) {
        next(e.detail || e);
      }
    };
    let fallback = (err) => {
      next(err);
    }
    authUtils.processRequestWithJWT(req, callback, fallback);
  }

  async userstatus(req, res, next) {
    let callback = async () => {
      try {
        res.locals.edit = true;
        let id = req.params.id;
        debug('detail %o', id);
        let detail = (await user.userstatus(id)).rows[0];

        res.status(200).json({
          detail
        });
      } catch (e) {
        next(e.detail || e);
      }
    };
    let fallback = (err) => {
      next(err);
    }
    authUtils.processRequestWithJWT(req, callback, fallback);
  }

  async edit(req, res, next) {
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

  async login(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    try {
      let result = await user.login(username, password);
      let token = jwt.sign({
        data: result
      }, config.secret, {
        expiresIn: 86400
      });
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: -1
      });
      res.status(200).send({
        status: res.statusCode,
        token: token
      });
    } catch (e) {
      let errorResponse = authUtils.processLoginError(e);
      res.status(400).json(errorResponse);
    }
  }

  async logout(req, res, next) {
    res.clearCookie('jwt');
    res.status(200).json({
      message: 'Cookie cleared'
    });
  }

  async delete(req, res, next) {
    let id = req.body.id;

    try {
      let result = (await user.delete({
        id
      }));
      res.status(200).json({
        pesan: "Berhasil dihapus",
        result
      });
    } catch (e) {
      res.status(400).json({
        pesan: "Terdapat Error",
        e
      })
    }
  }

  async verifikasiotp(req, res, next) {
    let kodeOTP = req.body.otp;
    let username = req.body.username;
    try {
      let result = await user.verifikasiotp(kodeOTP, username);
      res.status(200).json({
        pesan: "OTP telah terverifikasi"
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async resendotp(req, res, next) {
    let data = req.body;
    try {
      let result = await user.resendotp(data);
      // let response = await sendWAUtils.sendWAMessage(result);
      // let responsesms = await sendSMSUtils.sendWAmsg(result);
      let responsesms = await sendSMSUtils.sendSMSMessage(result);
      console.log(responsesms);
      // if (response.status == 200){
      res.status(200).json({
        pesan: "OTP telah diperbaharui",
        result
      })
      // }
    } catch (e) {
      next(e.detail);
    }
  }

  async verifikasiUser(req, res, next) {
    let statusUserUpdate = req.body;
    try {
      let result = await user.verifikasiUser(statusUserUpdate);
      res.status(200).json({
        pesan: "User Telah Aktif",
        result: result
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async register(req, res, next) {

    let data = req.body;
    try {
      var randomOTP = totp.now(); // => generate OTP
      let checkregistrasi = await user.checkregistrasi(data, randomOTP);
      if (checkregistrasi.status == '200') {
        let checkphone = await sendSMSUtils.checkphone(data);
        console.log(checkphone.status);
        if (checkphone.status == 404) {
          res.status(400).json({
            status: 'Coba periksa kembali nomor handphone yang dimasukkan. Sepertinya ada yg keliru.'
          });
        } else {
          let responsesms = await sendSMSUtils.sendSMSMessage(checkphone.phoneNumber, randomOTP, res);
          res.status(200).json({
            pesan: "User belum verifikasi OTP",
            userData: checkregistrasi.data,
          });
        }

      } else {
        let checkdatauser = await user.checkdatauser(data);
        if (checkdatauser.status == '400') {
          res.status(400).json({
            status: checkdatauser.errors
          });
        } else {
          let checkphone = await sendSMSUtils.checkphone(data);
          if (checkphone.status == 404) {
            console.log("checkphone.status");
            res.status(400).json({
              status: 'Coba periksa kembali nomor handphone yang dimasukkan. Sepertinya ada yg keliru.'
            });
          } else {
            let result = await user.register(data, randomOTP);
            let responsesms = await sendSMSUtils.sendSMSMessage(checkphone.phoneNumber, randomOTP, res);
            res.status(200).json({
              pesan: "Registrasi awal selesai, menunggu verifikasi OTP",
              userData: result,
            });
          }
        }
      }

      //  }
    } catch (e) {
      res.status(400).json('Registrasi Gagal !');
    }
  }

  async registerlanjut(req, res, next) {

    let data = req.body;
    try {
      let response = await convimage.base64toimage(data);
      let result = await user.registerlanjut(data, response);

      res.status(200).json({
        pesan: "Akun Driver berhasil didaftarkan",
        userData: result,

      });

    } catch (e) {
      next(e.detail);
    }
  }

  async searchingdata(req, res, next) {
    let data = req.body.keyword;
    try {
      let result = await user.searchingdata(data);
      res.status(200).json({
        result
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async is_active(req, res, next) {

    let id = req.user.data.id
    try {
      await user.is_active(id);
      res.status(200).send({
        status: res.statusCode,
        message: "success"
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async active(req, res, next) {

    let id = req.user.data.id
    try {
      await user.active(id);
      res.status(200).send({
        status: res.statusCode,
        message: "active",
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async nonactive(req, res, next) {

    let id = req.user.data.id
    try {
      await user.nonactive(id);
      res.status(200).send({
        status: res.statusCode,
        message: "non active",
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async autobid(req, res, next) {

    let id = req.user.data.id
    try {
      await user.autobid(id);
      res.status(200).send({
        status: res.statusCode,
        message: "success"
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async activeautobid(req, res, next) {

    let id = req.user.data.id
    try {
      await user.activeautobid(id);
      res.status(200).send({
        status: res.statusCode,
        message: "active",
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async nonactiveautobid(req, res, next) {

    let id = req.user.data.id
    try {
      await user.nonactiveautobid(id);
      res.status(200).send({
        status: res.statusCode,
        message: "non active",
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async homealt(req, res, next) {

    let id = req.user.data.id
    try {
      let result = await user.homealt(id);
      res.status(200).send({
        status: res.statusCode,
        data: result
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async allorderhistory(req, res, next) {

    let id = req.user.data.id
    try {
      let result = await user.allorderhistory(id);
      res.status(200).send({
        status: res.statusCode,
        data: result
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async lastorder(req, res, next) {

    let id = req.user.data.id
    try {
      let result = await user.lastorder(id);
      res.status(200).send({
        status: res.statusCode,
        data: result
      })
    } catch (e) {
      next(e.detail);
    }
  }

  async incomingorder(req, res, next) {

    let kode = req.params.kode
    try {
      let result = await user.incomingorder(kode);
      res.status(200).send({
        status: res.statusCode,
        data: result
      })
    } catch (e) {
      next(e.detail);
    }
  }



}

module.exports = new UserController();