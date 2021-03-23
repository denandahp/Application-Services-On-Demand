const debug = require('debug')('app:controller:customerMenujfood');
const pool = require('../libs/db');

const schema = '"orders"';
const table = '"orders"';
const dbTable = schema + '.' + table;
const dbViewjfood = schema + '.' + '"jfood"';

class customerMenujfoodModel{

    async listorder(id_user) {
        try{
            
            let result = await pool.query(' SELECT kode, total_price_customer, created_at, status FROM ' + dbTable + ' WHERE customer_id = $1 ORDER BY created_at ASC', [id_user])
            debug('get %o', result);
            return result.rows;

        }catch(ex){
            console.log('Enek seng salah iki ' + ex);
            return "data " + ex;
        };
      }

      async detailorder(id_user, kode) {
        try{
            
            let res = await pool.query(' SELECT * FROM ' + dbViewjfood + ' WHERE user_id = $1 AND kode = $2 ;', [id_user, kode])
            debug('get %o', res);
            return res.rows;

        }catch(ex){
            console.log('Enek seng salah iki ' + ex);
            return "data " + ex;
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

module.exports = new customerMenujfoodModel();