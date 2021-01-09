const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantInforestoran');
const merchantInforestoran = require('../models/merchantInforestoran.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class merchantInforestoranController{
    async register(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            console.log("response");
            let response = await convimage.convImagemerchantrestoran(data);
            console.log(response);
            let result = await merchantInforestoran.register(data,response);
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
            let response = await convimage.convImagemerchantrestoran(data);
            console.log(response);
            let result = await merchantInforestoran.update(data,response);
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
            let detail = (await merchantInforestoran.get(username));
      
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

      async getkategori(req, res, next) {
        let callback = async () => {          
          try {
            let detail = (await merchantInforestoran.getkategori());
      
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

      async waktupersiapan(req, res, next) {
        let callback = async () => {          
          try {
            let detail = (await merchantInforestoran.waktupersiapan());
      
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

      async delete (req, res, next) {
        let id = req.body.infoproduk_id;
    
        try {
          let result = (await merchantInforestoran.delete({id}));
          res.status(200).json({
            pesan : "Produk Berhasil dihapus",
            result
          });
        } catch (e) {
          res.status(400).json({
            pesan: "Terdapat Error",
            e
          })
        }
      }

}

module.exports = new merchantInforestoranController();