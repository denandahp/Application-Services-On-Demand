const authUtils = require('./authUtils.js');
const debug = require('debug')('app:controller:customerPayment');
const customerPayment = require('../models/customerPayment.js');
const convimage = require('./convimage.js');

const config = require('../configs.json');

class customerPaymentController{
    async paymentMenu(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            let result = await customerPayment.paymentMenu(data);
            let pesan = "Menu " + result.menu_id + " berhasil diorder " ;
            res.status(200).json({
                pesan: pesan,
                result: result,
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

    async paymentOrdernumber(req, res, next) {
        let callback = async () => {
     
         try {
            let data = req.body;
            //let data = {page, limit, idKategori, hargaMin, hargaMax, jenisMakanan, penilaian, sortBy, data};
            let result = await customerPayment.paymentOrdernumber(data);
            let pesan = "Orderan sudah didaftarkan dengan nomor " + result.kode;
            res.status(200).json({
              pesan: pesan,
              result: result.result,
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

    async rejectedorder(req, res, next) {
      let callback = async () => {
   
       try {
          let data = req.body;
          //let data = {page, limit, idKategori, hargaMin, hargaMax, jenisMakanan, penilaian, sortBy, data};
          let result = await customerPayment.rejectedorder(data);
          let pesan = "Orderan dibatalkan oleh " + data.name + " dengan alasan" + data.reason_customer_rejected;
          res.status(200).json({
            pesan: pesan,
            result: result.result,
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

    async detailorder(req, res, next) {
      let callback = async () => {
   
       try {
          let kode = req.params.kode;
          //let data = {page, limit, idKategori, hargaMin, hargaMax, jenisMakanan, penilaian, sortBy, data};
          let result = await customerPayment.detailorder(kode);
          let pesan = "Detail orderan kode pemesanan " + kode;
          res.status(200).json({
            pesan: pesan,
            result: result.result,
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

    


}

module.exports = new customerPaymentController();