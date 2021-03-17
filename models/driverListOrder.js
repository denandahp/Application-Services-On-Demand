const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const {
    hash
} = require('bcrypt');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const aktcust = 'driver.aktivitas_customer';
const aktpeng = 'driver.aktivitas_pengemudi';
const aktselpeng = 'driver.aktivitas_seluruh_pengemudi';
const detord = 'driver.detail_order';
const antpeng = 'driver.antrian_pengemudi';
const antpengnew = 'driver.antrian_pengemudi_baru';
const allpeng = 'driver.semua_pengemudi';
const pendnew = 'driver.pendaftar_baru';

class DriverListOrder {

    async driverlistorder(kode) {

        try {
            let res = await pool.query(`SELECT * FROM ${aktselpeng}`);
            debug('driverlistorder %o', res);
            if (res.rowCount <= 0) {
                return {
                    "status": "404",
                    "errors": "Aktifitas pengemudi masih kosong"
                }
            } else {
                return res.rows;
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async listorderbydriver(id) {

        try {
            let res = await pool.query(`SELECT * FROM ${aktpeng}(` + id + `)`);
            debug('driverlistorder %o', res);
            if (res.rowCount <= 0) {
                return {
                    "status": "404",
                    "errors": "ID Driver tidak ditemukan"
                }
            } else {
                return res.rows;
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async detailorder(kode) {

        try {
            let res = await pool.query(`SELECT * FROM ${detord}( '${kode}') `);
            debug('driverlistorder %o', res);
            if (res.rowCount <= 0) {
                return {
                    "status": "404",
                    "errors": "ID Order tidak ditemukan"
                }
            } else {
                return res.rows;
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }
}

module.exports = new DriverListOrder();