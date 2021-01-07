const debug = require('debug')('app:controller:merchantJambuka');
const pool = require('../libs/db');

const schema = '"merchant"';
const table = '"restaurant"';
const dbTable = schema + '.' + table;

class merchantJambukaModel{
    async register (data) {
      try{
        console.log("cek sini broo1");
        var d = new Date(Date.now());
        let value =  [data.user_id, data.is_open_ , data.open_time_, data.close_time_, d]
        let res = await pool.query('UPDATE ' + dbTable + 'SET (is_open_' + data.day + ', open_time_'+ data.day +', close_time_'+ data.day +', updated_at) = ($2, $3, $4, $5) WHERE user_id = $1 RETURNING user_id, name, is_open_' + data.day + ', open_time_'+ data.day +', close_time_'+ data.day +', updated_at;', value);
        console.log("cek sini broo2");
        debug('register %o', res);
        return res;

      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async update (data) {
      try{
        var d = new Date(Date.now());
          let sets = [data.user_id, data.is_open_ + data.day , data.open_time_ + data.day, data.close_time_ + data.day, d]
          let res = await pool.query('UPDATE ' + dbTable + 'SET (is_open_' + data.day + ', open_time_'+ data.day +', close_time_'+ data.day +', updated_at) = ($2, $3, $4, $5) WHERE user_id = $1 RETURNING user_id, name, is_close, is_open_' + data.day + ', open_time_'+ data.day +', close_time_'+ data.day +', updated_at;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
        
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async closedresto (data) {
      try{
        var d = new Date(Date.now());
          let sets = [data.user_id, data.is_close, d]
          let res = await pool.query('UPDATE ' + dbTable + 'SET (is_close ,updated_at) = ($2, $3) WHERE user_id = $1 RETURNING user_id, name, is_close, updated_at;', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
        
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
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

}

module.exports = new merchantJambukaModel();