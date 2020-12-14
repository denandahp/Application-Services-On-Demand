const debug = require('debug')('app:controller:merchantInfopemilik');
const pool = require('../libs/db');

const schema = '"merchant"';
const table = '"infopemilik"';
const dbTable = schema + '.' + table;

class merchantInfopemilikModel{
    async register (data, datagambar) {
      try{
        var d = new Date(Date.now());
        let value =  [ data.username, data.infopemilik_nama, datagambar.infopemilik_kk, datagambar.infopemilik_ktp, data.infopemilik_nomeridentitas, data.infopemilik_tanggallahir, d, d]
        let res = await pool.query('INSERT INTO ' + dbTable + ' (username, infopemilik_nama, infopemilik_kk, infopemilik_ktp, infopemilik_nomeridentitas, infopemilik_tanggallahir, infopemilik_date, infopemilik_lastdate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', value);
        debug('register %o', res);
    
        return res;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

    async update (data, datagambar) {
      var d = new Date(Date.now());
        console.log(datagambar);
        let sets = [data.username, data.infopemilik_nama, datagambar.infopemilik_kk, datagambar.infopemilik_ktp, data.infopemilik_nomeridentitas, data.infopemilik_tanggallahir, d]
        let res = await pool.query('UPDATE' + dbTable + 'SET (infopemilik_nama, infopemilik_kk, infopemilik_ktp, infopemilik_nomeridentitas, infopemilik_tanggallahir, infopemilik_lastdate) = ($2, $3, $4, $5, $6, $7) WHERE username = $1 RETURNING *', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;
    }

    async get(username) {

      let res;
      if(username == 'all'){
        res = await pool.query(' SELECT * FROM ' + dbTable + 'ORDER BY username DESC')
      }else {
        res = await pool.query(' SELECT * FROM ' + dbTable + ' where username = $1 ORDER BY username DESC', [username])
      }
      
      debug('get %o', res);

      return res.rows;

    }

}

module.exports = new merchantInfopemilikModel();