const debug = require('debug')('app:controller:customerPayment');
const pool = require('../libs/db');
const notifbody = require('./notificationBody.js');

const schema = '"customer"';
const table = '"cart_restaurant"';
const dbTable = schema + '.' + table;
const dbMenuorder = 'customer.cart_menu';

class customerPaymentModel{

    async paymentOrdernumber (data) {
      try{
        var d = new Date(Date.now());d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
        let sets = [data.user_id, data.restaurant_id, data.landmark, data.alamat, data.catatan_alamat, 
                  data.metode_pembayaran, data.id_promo_admin, data.sub_total, data.ongkir, data.harga_total, d, d]
        let res = await pool.query('INSERT INTO ' + dbTable + '(user_id, restaurant_id, landmark, alamat, catatan_alamat, metode_pembayaran, id_promo_admin, sub_total, ongkir, ' +
                                    'harga_total, created_at, updated_at ) VALUES ($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async paymentMenu (data) {
      try{
        var d = new Date(Date.now());;d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
        let sets = [data.cart_restaurant_id, data.menu_id, data.price_merchant, data.price_customer, data.quantity, data.catatan, d, d]
        let res = await pool.query('INSERT INTO ' + dbMenuorder + ' (cart_restaurant_id, menu_id, price_merchant, price_customer, quantity, catatan, created_at, updated_at)' + 
                                  ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', sets);
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