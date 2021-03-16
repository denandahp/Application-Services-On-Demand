const debug = require('debug')('app:controller:customerPayment');
const pool = require('../libs/db');
const notifbody = require('./notificationBody.js');

const schema = '"orders"';
const table = '"jfood_cart"';
const dbTable = schema + '.' + table;
const dbMenuorder = schema + '.' + "jfood_cart_menu";
const dbOrders = schema + '.' + "orders";


class customerPaymentModel{

    async paymentOrdernumber (data) {
      try{
        let result ={};
        var d = new Date(Date.now());d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
        var dd = d.getDate();var mm = d.getMonth() + 1;var hour = d.getHours();var minute = d.getMinutes();
        var kodeSistem= "JF";
        var FormattedDate = dd + ""+ mm + "" + hour +""+ minute ;
        var strUserid = "" + data.user_id;var strRestoid = "" + data.restaurant_id;
        var padUserid = "000000";var padRestoid = "000000";
        var ansUserid = padUserid.substring(0, padUserid.length - strUserid.length) + strUserid;
        var ansRestoid = padRestoid.substring(0, padRestoid.length - strRestoid.length) + strRestoid;
        var kode = kodeSistem + ansUserid + ansRestoid + FormattedDate;
        console.log(ansUserid, ansRestoid, FormattedDate);
        let sets = [kode, data.user_id, data.restaurant_id, data.landmark_destination, data.address_destination, data.latitude_destination
                    , data.longitude_destination, data.note_destination, data.metode_pembayaran, data.promo_admin_id, data.sub_total, data.ongkir,
                    data.harga_total, d, d, data.diskon_admin, data.diskon_merchant, data.harga_total_merchant, data.kode_promo, data.harga_total_driver]
        let res = await pool.query('INSERT INTO ' + dbTable + '(kode, user_id, restaurant_id, landmark_destination, address_destination, latitude_destination,'+ 
                                    'longitude_destination, note_destination, metode_pembayaran, promo_admin_id, sub_total, ongkir, ' +
                                    'harga_total, created_at, updated_at, diskon_admin, diskon_merchant ,harga_total_merchant ,kode_promo ,harga_total_driver)'+
                                    'VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *;', sets);
        let values =[kode, data.user_id, "Customer Memesan Makanan", data.latitude_destination, data.longitude_destination, data.landmark_destination, data.address_destination,
                                    data.note_destination, data.kode_promo, data.diskon_admin, data.diskon_merchant, data.sub_total, data.ongkir,
                                    data.harga_total_merchant, data.harga_total_driver, data.harga_total, d, d, token_customer, token_merchant, data.latitude_merchant, data.longitude_merchant]
        let orders = await pool.query('INSERT INTO ' + dbOrders + ' (kode, customer_id, status, latitude_location_destination, longitude_location_destination,'+
                                      'landmark_destination, address_destination, patokan_destination, kode_promo, diskon_admin, diskon_merchant, sub_total, ongkir,'+
                                      'total_price_merchant, total_price_driver, total_price_customer, created_at, updated_at, data.token_customer, data.token_merchant'+
                                      'latitude_location_pickup, longitude_location_pickup)' + 
                                    ' VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *;', values)
        debug('update %o', res);
        result.orders = orders;
        return result;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async paymentMenu (data) {
      try{
        var d = new Date(Date.now());;d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
        let sets = [data.jfood_cart_uuid, data.menu_id, data.price_merchant, data.price_customer, data.quantity, data.catatan, d, d, data.jfood_cart_kode]
        let res = await pool.query('INSERT INTO ' + dbMenuorder + ' (jfood_cart_uuid, menu_id, price_merchant, price_customer, quantity, catatan, created_at, updated_at, jfood_cart_kode)' + 
                                  ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async get(id) {

      let res;
      if(id == 'all'){
        res = await pool.query(' SELECT * FROM ' + dbTable + 'ORDER BY id DESC')
      }else {
        res = await pool.query(' SELECT * FROM ' + dbTable + ' where id = $1 ORDER BY id DESC', [id])
      }
      
      debug('get %o', res);

      return res.rows;

    }

}

module.exports = new customerPaymentModel();