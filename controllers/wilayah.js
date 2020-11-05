const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:wilayah');
const wilayah = require('../models/wilayah.js');

const config = require('../configs.json');

class wilayahController{
      async provinsi(req, res, next) {
        let callback = async () => {
          try {
            let detail = (await wilayah.provinsi());
      
            res.status(200).json(detail)
      
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processGETRequestError();
            res.status(400).json(errorResponse);
          }
        }
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async kab_kota(req, res, next) {
        let callback = async () => {
          let kodeprov = req.params.kodeprov;
    
          debug('detail %o', kodeprov)
      
          try {
            let detail = (await wilayah.kab_kota(kodeprov));
      
            res.status(200).json(detail)
      
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processGETRequestError();
            res.status(400).json(errorResponse);
          }
        }
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async kecamatan(req, res, next) {
        let callback = async () => {
          let kodeprov = req.params.kodeprov;
    
          debug('detail %o', kodeprov)
      
          try {
            let detail = (await wilayah.kecamatan(kodeprov));
      
            res.status(200).json(detail)
      
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processGETRequestError();
            res.status(400).json(errorResponse);
          }
        }
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async kelurahan(req, res, next) {
        let callback = async () => {
          let kodeprov = req.params.kodeprov;
    
          debug('detail %o', kodeprov)
      
          try {
            let detail = (await wilayah.kelurahan(kodeprov));
      
            res.status(200).json(detail)
      
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processGETRequestError();
            res.status(400).json(errorResponse);
          }
        }
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }
}

module.exports = new wilayahController();