const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');
const schema = '"public"';
const table = '"users"'
const dbTable = schema + '.' + table;

class HomeAltDriverModel {

    async is_active(id) {

        let check = await pool.query('SELECT is_active FROM ' + dbTable + ' WHERE id = ' + id);

        if (check.rows[0].is_active == false) {
            try {
                pool.query('call public.sp_modal_set_active(' + id + ')', (error, results) => {
                    if (error) {
                        return console.error(error.message);
                    }
                });
            } catch (ex) {
                console.log('Error : ' + ex);
            };
        } else {
            try {
                pool.query('call public.sp_modal_set_deactive(' + id + ')', (error, results) => {
                    if (error) {
                        return console.error(error.message);
                    }
                });
            } catch (ex) {
                console.log('Error : ' + ex);
            };
        }
    }

    async active(id) {

        try {
            pool.query('call public.sp_modal_set_active(' + id + ')', (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async nonactive(id) {

        try {
            pool.query('call public.sp_modal_set_deactive(' + id + ')', (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async autobid(id) {

        let check = await pool.query('SELECT is_bid_active FROM ' + dbTable + ' WHERE id = ' + id);

        if (check.rows[0].is_bid_active == false) {
            try {
                pool.query('call public.sp_bid_set_active(' + id + ')', (error, results) => {
                    if (error) {
                        return console.error(error.message);
                    }
                });
            } catch (ex) {
                console.log('Error : ' + ex);
            };
        } else {
            try {
                pool.query('call public.sp_bid_set_deactive(' + id + ')', (error, results) => {
                    if (error) {
                        return console.error(error.message);
                    }
                });
            } catch (ex) {
                console.log('Error : ' + ex);
            };
        }
    }

    async activeautobid(id) {

        try {
            pool.query('call public.sp_bid_set_active(' + id + ')', (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async nonactiveautobid(id) {

        try {
            pool.query('call public.sp_bid_set_deactive(' + id + ')', (error, results) => {
                if (error) {
                    return console.error(error.message);
                }
            });
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async homealt(id) {
        let users = await pool.query('SELECT photo, is_active, namadepan, namabelakang, is_bid_active, perform, estimasi_pendapatan, jumlah_orderan_masuk  FROM ' + dbTable + ' WHERE id = ' + id);
        debug('homealt %o', users);

        return {
            "photo": users.rows[0].photo,
            "isactive": users.rows[0].is_active,
            "name": users.rows[0].namadepan + users.rows[0].namabelakang,
            "autobid": users.rows[0].is_bid_active,
            "perform": users.rows[0].perform,
            "estimasi_pendapatan": users.rows[0].estimasi_pendapatan,
            "jumlah_orderan_masuk": users.rows[0].jumlah_orderan_masuk,
        }
    }

    async allorderhistory(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT get_jumlah_orderan_masuk_driver(' + id + ')', (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results.rows[0].get_jumlah_orderan_masuk_driver);
            })
        })
    }

    async lastorder(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT get_jumlah_orderan_masuk_driver(' + id + ')', (error, results) => {
                if (error) {
                    return reject(error);
                }
                return resolve(results.rows[0].get_jumlah_orderan_masuk_driver);
            })
        })
    }
}

module.exports = new HomeAltDriverModel();