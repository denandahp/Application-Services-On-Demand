const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantJambuka');
const merchantJambuka = require('../models/merchantJambuka.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class merchantJambukaController{
    async register(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantJambuka.register(data);
            res.status(200).json({
              pesan: "Jam Operasional Berhasil Disimpan",
              activityData: result.data,
              state : result.state
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
            let result = await merchantJambuka.update(data);
            res.status(200).json({
              pesan: "Jam Operasional Berhasil diperbaharui",
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

      async closedresto(req, res, next) {
        let callback = async () => {
     
        try {
            let data = req.body;
            let result = await merchantJambuka.closedresto(data);
            res.status(200).json({
              pesan: "Restaurant sedang tutup",
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
          let user_id = req.params.user_id;
    
          debug('detail %o', user_id)
      
          try {
            let detail = (await merchantJambuka.get(user_id));
      
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

      async stateJambuka(req, res, next) {

        let user_id = req.params.user_id;
        debug('detail %o', user_id)


        let callback = async () => {          
          try {
            let detail = (await merchantJambuka.stateJambuka(user_id));
      
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

module.exports = new merchantJambukaController();