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
            let result = await merchantInfoproduk.register(data);
            let pesan = data.name + " Berhasil Ditambahkan"
            res.status(200).json({
              pesan: pesan,
              activityData: result.data,
              state: result.state
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
            let result = await merchantInfoproduk.update(data);
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
      
            res.status(200).json({
              detail
              
            })
      
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
        let data = req.body;
    
        try {
          let nama = data.name + ' Berhasil dihapus';
          let result = await merchantInfoproduk.delete(data);

          res.status(200).json({
            pesan : nama,
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
            let pesan = data.name + " Berhasil Ditambahkan"
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

      async updateKategori(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await merchantInfoproduk.updateKategori(data);
            let pesan = data.name + " Berhasil diUpdate"
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
          let restaurant_id = req.params.restaurant_id;
    
          debug('detail %o', restaurant_id)
      
          try {
            let detail = (await merchantInfoproduk.getstock(restaurant_id));
      
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

      async stateMenu(req, res, next) {
        let callback = async () => {
          let user_id = req.params.user_id;
    
          debug('detail %o', user_id)
      
          try {
            let detail = (await merchantInfoproduk.stateMenu(user_id));
      
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