const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantInfousaha');
const merchantInfousaha = require('../models/merchantInfousaha.js');

const config = require('../configs.json');

class merchantInfousahaController{
    async register(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantInfousaha.register(data);
            res.status(200).json({
              pesan: "Infousaha Berhasil Disimpan",
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
            let result = await merchantInfousaha.update(data);
            res.status(200).json({
              pesan: "Infousaha Berhasil diperbaharui",
              activityData: result,
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
          let username = req.params.username;
    
          debug('detail %o', username)
      
          try {
            let detail = (await merchantInfousaha.get(username));
      
            res.status(200).json({detail})
      
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

      
      async pendapatan(req, res, next) {
        let callback = async () => {
          let peroption = req.params.peroption;
    
          debug('detail %o', peroption)
      
          try {
            let detail = (await merchantInfousaha.pendapatan(peroption));
      
            res.status(200).json({detail})
      
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

module.exports = new merchantInfousahaController();