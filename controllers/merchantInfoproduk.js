const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantInfoproduk');
const merchantInfoproduk = require('../models/merchantInfoproduk.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class merchantInfoprodukController{
    async register(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let response = await convimage.convImagemerchantproduk(data);
            console.log(response);
            let result = await merchantInfoproduk.register(data,response);
            let pesan = data.name + "Berhasil Ditambahkan"
            res.status(200).json({
              pesan: pesan,
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
            let response = await convimage.convImagemerchantproduk(data);
            console.log(response);
            let result = await merchantInfoproduk.update(data,response);
            let pesan = data.name + "berhasil diperbaharui"
            res.status(200).json({
              pesan: pesan,
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
          let restaurant_id = req.params.restaurant_id;
          let id_product = req.params.id_product;
          let id_kategori = req.params.id_kategori;
    
          //debug('detail %o', restaurant_id,id_product, id_kategori)
      
          try {
            let detail = (await merchantInfoproduk.get(restaurant_id,id_product,id_kategori));
      
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
          let restaurant_id = req.params.restaurant_id;
    
          debug('detail %o', restaurant_id)
      
          try {
            let detail = (await merchantInfoproduk.getkategori(restaurant_id));
      
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
          let result = (await merchantInfoproduk.delete(id));
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

      async kategoribaru(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantInfoproduk.kategoribaru(data);
            let pesan = data.name + "Berhasil Ditambahkan"
            res.status(200).json({
              pesan: pesan,
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

      async stockbaru(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantInfoproduk.stockbaru(data);
            let pesan = "stock " + data.name + "Berhasil Diubah"
            res.status(200).json({
              pesan: pesan,
              activityData: result.rows,
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

      async getstock(req, res, next) {
        let callback = async () => {
          let id_product = req.params.id_product;
    
          debug('detail %o', id_product)
      
          try {
            let detail = (await merchantInfoproduk.getstock(id_product));
      
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

module.exports = new merchantInfoprodukController();