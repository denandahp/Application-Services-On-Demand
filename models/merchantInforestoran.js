const debug = require('debug')('app:controller:merchantInforestoran');
const pool = require('../libs/db');

const schema = '"merchant"';
const table = '"restaurant"';
const dbTable = schema + '.' + table;
const dbkategori = schema + '.kategori_restaurant'
const dbWaktupersiapan = schema +'.option_preparation_in_range'

class merchantInforestoranModel{
    async register (data,datagambar) {
      try{
        var d = new Date(Date.now());
        let value =  [ data.user_id, datagambar.media_logo, datagambar.media_banner, data.categori_restaurant_id, data.option_preparation_in_range_id , data.description, d]
        let res = await pool.query('UPDATE ' + dbTable + ' SET (media_logo, media_banner, categori_restaurant_id, option_preparation_in_range_id , description, updated_at) = ($2, $3, $4, $5, $6, $7) WHERE user_id = $1 RETURNING user_id, name, media_logo, media_banner, category, option_preparation_in_range_id , description, updated_at;', value);
        debug('register %o', res);
    
        return res;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async update (data,datagambar) {
      var d = new Date(Date.now());
        let sets = [ data.user_id, datagambar.media_logo, datagambar.media_banner, data.categori_restaurant_id, data.option_preparation_in_range_id , data.description, d]
        let res = await pool.query('UPDATE ' + dbTable + ' SET (media_logo, media_banner, categori_restaurant_id, option_preparation_in_range_id , description, updated_at) = ($2, $3, $4, $5, $6, $7) WHERE user_id = $1 RETURNING *;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
    }

    async get(user_id) {

      let res;
      if(user_id == 'all'){
        res = await pool.query(' SELECT * FROM ' + dbTable + 'ORDER BY user_id DESC')
      }else {
        res = await pool.query(' SELECT * FROM ' + dbTable + ' where user_id = $1 ORDER BY user_id DESC', [user_id])
      }
      
      debug('get %o', res);

      return res.rows;

    }

    async getkategori() {

      let res;
      res = await pool.query(' SELECT name FROM ' + dbkategori + ' ORDER BY id DESC')
      
      debug('get %o', res);

      return res.rows;
    }

    async waktupersiapan() {

      let res;
      res = await pool.query(' SELECT id, preparation_in_range, preparation_in_minute FROM ' + dbWaktupersiapan + ' ORDER BY id DESC')
      
      debug('get %o', res);

      return res.rows;

    }

    async delete(data) {  
      const res = await pool.query('DELETE from ' + dbTable + ' where user_id = $1 RETURNING *', [data]);
  
      debug('delete %o', res);
  
      return res;
    }

}

module.exports = new merchantInforestoranModel();