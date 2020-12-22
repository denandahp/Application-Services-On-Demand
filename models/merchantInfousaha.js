const debug = require('debug')('app:controller:merchantInfousaha');
const pool = require('../libs/db');

const schema = '"merchant"';
const table = '"infousaha"';
const dbTable = schema + '.' + table;
const dbinfopendapatan = schema + '.infopendapatan'

class merchantInfousahaModel{
    async register (data) {
      try{

        var d = new Date(Date.now());
        let value =  [ data.username, data.infousaha_name, data.infousaha_bidangusaha, data.infousaha_penjualanpertahun, 
                      data.infousaha_penjualanperhari, data.infousaha_lokasimaps, data.infousaha_alamat, data.infousaha_provinsi, 
                      data.infousaha_kota_kab, data.infousaha_patokan, d, d, data.infousaha.state]
        let res = await pool.query('INSERT INTO ' + dbTable + ' (username, infousaha_name, infousaha_bidangusaha,' +
                                  'infousaha_penjualanpertahun, infousaha_penjualanperhari, infousaha_lokasimaps, infousaha_alamat, infousaha_provinsi,'+
                                  'infousaha_kota_kab, infousaha_patokan, infousaha_date, infousaha_lastdate, infousaha.state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;', value);
        debug('register %o', res);
    
        return res;

        }catch(ex){
          console.log('Enek seng salah iki ' + ex)
        };
      }

    async update (data) {
      try{
        var d = new Date(Date.now());
        let sets = [ data.username, data.infousaha_name, data.infousaha_bidangusaha, data.infousaha_penjualanpertahun, 
                     data.infousaha_penjualanperhari, data.infousaha_lokasimaps, data.infousaha_alamat, data.infousaha_provinsi, 
                     data.infousaha_kota_kab, data.infousaha_patokan, d, data.infousaha.state]
        let res = await pool.query('UPDATE' + dbTable + 'SET ( infousaha_name, infousaha_bidangusaha,' +
                     'infousaha_penjualanpertahun, infousaha_penjualanperhari, infousaha_lokasimaps, infousaha_alamat, infousaha_provinsi,'+
                     'infousaha_kota_kab, infousaha_patokan, infousaha_lastdate, infousaha.state) = ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)' +
                     'WHERE username = $1 RETURNING *', sets);
        debug('update %o', res);
        let result = res.rows[0];
        return result;

      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
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

    async pendapatan(peroption){
      try{
        let res;
        if (peroption == 'perhari'){res = await pool.query(' SELECT pendapatan_perhari FROM ' + dbinfopendapatan + ' ORDER BY infopendapatan_id DESC')}
        else if (peroption == 'perminggu'){res = await pool.query(' SELECT pendapatan_perminggu FROM ' + dbinfopendapatan + ' ORDER BY infopendapatan_id DESC')}
        else if (peroption == 'perbulan'){res = await pool.query(' SELECT pendapatan_perbulan FROM ' + dbinfopendapatan + ' ORDER BY infopendapatan_id DESC')}
        else if (peroption == 'pertahun'){res = await pool.query(' SELECT pendapatan_pertahun FROM ' + dbinfopendapatan + ' ORDER BY infopendapatan_id DESC')}
        else{res = await pool.query(' SELECT * FROM ' + dbinfopendapatan + 'ORDER BY infopendapatan_id DESC')}
        
        debug('get %o', res);

        return res.rows;
      }catch(ex){
        console.log('Enek seng salah iki ' + ex)
      };
    }

}

module.exports = new merchantInfousahaModel();