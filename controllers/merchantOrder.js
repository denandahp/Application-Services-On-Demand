const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:merchantOrder');
const merchantOrder = require('../models/merchantOrder.js');

const config = require('../configs.json');

class merchantOrderController{
    async opsistatus(req, res, next) {
      let callback = async () => {
  
      try {
          let data = req.body;
          let result = await merchantOrder.opsistatus(data);
          res.status(200).json({
            pesan: "Merchant Menerima Pesanan",
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

    async orderready(req, res, next) {
      let callback = async () => {
  
      try {
          let data = req.body;
          let result = await merchantOrder.orderready(data);
          res.status(200).json({
            pesan: "Merchant Pesanan Sudah Siap",
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

    async rejectorder(req, res, next) {
      let callback = async () => {
  
      try {
          let data = req.body;
          let result = await merchantOrder.rejectorder(data);
          res.status(200).json({
            pesan: "Merchant Menolak Pesanan",
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
      
    async pesananmasuk(req, res, next) {
      let callback = async () => {
        let kode = req.params.kode;
      
        debug('detail %o', kode)
        
        try {
          let detail = (await merchantOrder.pesananmasuk(kode));
        
            res.status(200).json({
              pesan : "Pesanan baru merchant",
              data: detail
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

    async transaksiorder(req, res, next) {
      let callback = async () => {
         let kode = req.params.kode;
      
         debug('detail %o', kode)
        
         try {
          let detail = (await merchantOrder.transaksiorder(kode));
        
            res.status(200).json({
              pesan : "Pesanan baru merchant",
              data: detail
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
}

module.exports = new merchantOrderController();