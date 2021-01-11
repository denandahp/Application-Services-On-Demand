const debug = require('debug')('app:controller:merchantInfoproduk');
const pool = require('../libs/db');

const schema = '"merchant"';
const table = '"menu"';
const dbTable = schema + '.' + table;
const dbKategori = 'merchant.kategori_menu';

class merchantInfoprodukModel{
    async register (data,datagambar) {
      try{
        var d = new Date(Date.now());
        let value =  [ data.restaurant_id, data.kategori_menu_id, datagambar.media_photo, data.name, data.description, data.price_merchant, d, d, data.is_active];
        let res = await pool.query('INSERT INTO ' + dbTable + ' (restaurant_id, kategori_menu_id, media_photo, name, description, price_merchant, created_at, updated_at, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;', value);
        debug('register %o', res);
    
        return res;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async update (data,datagambar) {
      var d = new Date(Date.now());
        let sets = [ data.id, data.restaurant_id, data.kategori_menu_id, datagambar.media_photo, data.name, data.description, data.price_merchant, d, data.is_active];
        let res = await pool.query('UPDATE' + dbTable + 'SET (kategori_menu_id, media_photo, name, description, price_merchant, updated_at, is_active) = ($3, $4, $5, $6, $7, $8, $9) WHERE restaurant_id = $2 AND id = $1 RETURNING *', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
    }

    async get(restaurant_id) {

      let res;
      if(restaurant_id == 'all'){
        res = await pool.query(' SELECT * FROM ' + dbTable + 'ORDER BY restaurant_id DESC')
      }else {
        res = await pool.query(' SELECT * FROM ' + dbTable + ' where restaurant_id = $1 ORDER BY restaurant_id DESC', [restaurant_id])
      }
      
      debug('get %o', res);

      return res.rows;

    }

    async getkategori(restaurant_id) {

      let res;
      if(restaurant_id == 'all'){
        res = await pool.query(' SELECT * FROM ' + dbKategori + ' ORDER BY id ASC')
      }else {
        res = await pool.query(' SELECT id, name FROM ' + dbKategori + ' where restaurant_id = $1  ORDER BY id ASC', [restaurant_id])
      }
      
      debug('get %o', res);

      return res.rows;

    }

    async kategoribaru (data) {
      try{
        var d = new Date(Date.now());
        let value =  [ data.name, data.restaurant_id, "normal", d, d]
        let res = await pool.query('INSERT INTO ' + dbKategori + ' (name, restaurant_id ,created_at, type, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *;', value);
        debug('register %o', res);
    
        return res;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async stockbaru (data) {
      try{
        var d = new Date(Date.now());
        let value =  [ data.id, data.name, data.is_available, d];
        let res = await pool.query('UPDATE ' + dbTable + ' (name, is_available, updated_at) = ($2, $3, $4) WHERE id = $1 RETURNING *;', value);
        debug('register %o', res);
    
        return res;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async getstock(id_product) {
      try{
        let res;

        if(restaurant_id == 'all'){
          res = await pool.query(' SELECT id, restaurant_id, name, is_available, updated_at FROM ' + dbTable + ' ORDER BY id ASC')
        }else {
          res = await pool.query(' SELECT id, restaurant_id, name, is_available, updated_at FROM ' + dbTable + ' WHERE id = $1 ORDER BY id ASC', [id_product])
        }

        debug('get %o', res);
        return res.rows;
    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };

    }

    async delete(data) {  
    try{
      const res = await pool.query('DELETE from ' + dbTable + ' where restaurant_id = $1 RETURNING * ', [(data)]);
  
      debug('delete %o', res);
      return res.rows;
    }catch(ex){
      console.log('Enek seng salah iki ' + ex)
    };
  }

}

module.exports = new merchantInfoprodukModel();