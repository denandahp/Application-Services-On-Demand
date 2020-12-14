const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantInfopemilik');
const merchantInfopemilik = require('../models/merchantInfopemilik.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class merchantInfopemilikController{
    async register(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let response = await convimage.convImagemerchantpemilik(data);
            console.log(response);
            let result = await merchantInfopemilik.register(data, response);
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
            let response = await convimage.convImagemerchantpemilik(data);
            let result = await merchantInfopemilik.update(data,response);
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
            let detail = (await merchantInfopemilik.get(username));
      
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

module.exports = new merchantInfopemilikController();