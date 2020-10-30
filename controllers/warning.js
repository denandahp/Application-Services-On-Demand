const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:warning');
const warning = require('../models/warning.js');

const config = require('../configs.json');

class warningController{
    async add(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await warning.add(data);
            res.status(200).json({
              pesan: "Berhasil  menyimpan warning",
              activityData: result.rows[0],
            })
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processPOSTRequestError();
            res.status(400).json(errorResponse);
          }
        };
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async update(req, res, next) {
        let callback = async () => {
     
        try {
            let data = req.body;
            let result = await warning.update(data);
            res.status(200).json({
              pesan: "Berhasil  diperbaharui",
              activityData: result.rows[0],
            })
          } catch (e) {
            console.log(e);
            let errorResponse = authUtils.processPOSTRequestError();
            res.status(400).json(errorResponse);
          }
        };
    
        let fallback = (err) => {
          console.log(err);
          next(err);
        }
    
        authUtils.processRequestWithJWT(req, callback, fallback);
      }

      async get(req, res, next) {
        let callback = async () => {
          let warning_id = req.params.warning_id;
    
          debug('detail %o', warning_id)
      
          try {
            let detail = (await warning.get(warning_id));
      
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

module.exports = new warningController();