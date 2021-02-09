const debug = require('debug')('app:controller:customerFilterfood');
const pool = require('../libs/db');

const schema = '"merchant"';
const table = '"restaurant"';
const dbTable = schema + '.' + table;

class customerFilterfoodModel{
    async searchbyName (page, limit, filterName) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let counts, res;
      let results = {};
      var d = new Date(Date.now()); d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
      try{
        if(filterName == "all"){
          counts= await pool.query('SELECT COUNT (*)  FROM ' + dbTable);
        }else{
          counts = await pool.query('SELECT COUNT (*) FILTER(WHERE name LIKE $1 ) FROM ' + dbTable, [filterName +'%']);
        };
        console.log(filterName, startIndex, limit, typeof endIndex, typeof counts.rows[0].count);
        if (endIndex <= counts.rows[0].count) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }else{ throw new Error('Syntax salah');};

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }else{results.previous ={ page : 0, limit: limit} };

        if(filterName == "all"){
          res = await pool.query('SELECT id, name, city, kategori_restaurant_id FROM' + dbTable + ' ORDER BY created_at OFFSET $1 LIMIT $2', [startIndex, limit]);
          results.res = res.rows;
        }else{
          res = await pool.query('SELECT id, name,  city, kategori_restaurant_id FROM' + dbTable + ' WHERE name LIKE $1 ORDER BY created_at OFFSET $2 LIMIT $3', [filterName +'%', startIndex, limit]);
          results.res = res.rows;
        }
        results.date = d;
        console.log(d);
        debug('register %o', results);
        return results;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex);
        return "data " + ex;
      };
    }

    async searchBycategory (data) {
      let page = parseInt(data.page); let limit = parseInt(data.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      let counts, res, results = {};
      var d = new Date(Date.now()); d.toLocaleString('en-GB', { timeZone: 'Asia/Jakarta' });
      try{
        if(data.idKategori == "all"){
          counts= await pool.query('SELECT COUNT (*)  FROM ' + dbTable);
        }else{
          counts = await pool.query('SELECT COUNT (*) FILTER(WHERE kategori_restaurant_id = $1 ) FROM ' + dbTable, [data.idKategori]);
        };
        console.log(data.idKategori, startIndex, limit, endIndex, counts.rows[0].count);
        if (endIndex <= counts.rows[0].count) {
          results.next = {
            page: page + 1,
            limit: limit
          }
        }else{ throw new Error('Syntax salah');};

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          }
        }else{results.previous ={ page : 0, limit: limit} };

        if(data.idKategori == "all"){
          res = await pool.query('SELECT id, name, city, kategori_restaurant_id FROM' + dbTable + ' ORDER BY created_at OFFSET $1 LIMIT $2', [startIndex, limit]);
          results.res = res.rows;
        }else{
          res = await pool.query('SELECT id, name,  city, kategori_restaurant_id FROM' + dbTable + ' WHERE kategori_restaurant_id = $1 ORDER BY created_at OFFSET $2 LIMIT $3', [data.idKategori, startIndex, limit]);
          results.res = res.rows;
        }
        results.date = d;
        console.log(d);
        debug('register %o', results);
        return results;
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

module.exports = new customerFilterfoodModel();