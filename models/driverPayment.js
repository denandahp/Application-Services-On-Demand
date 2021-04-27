const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const {
    hash
} = require('bcrypt');
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const topuptb = 'driver.topup';

class PaymentActivityModel {
    async add(data) {

        try {
            const value = [data.transaction_status.toUpperCase(), data.transaction_id, data.signature_key, data.payment_type, data.transaction_time]
            const res = await pool.query(`UPDATE ${topuptb} SET (transaction_status, transaction_id, signature_key, payment_type, updated_at) = ($1, $2, $3, $4, $5) WHERE "topup_id" = '${data.order_id}' RETURNING *;`, value);

            if (res.rows[0].transaction_status == "SETTLEMENT") {
                const newData = res.rows[0]
                const driverID = await pool.query(`SELECT driver_id, nominal from ${saldotb} WHERE "driver_id" = '${newData.driver_id}'`);
                const saldo = driverID.rows[0].nominal + newData.nominal;
                const d = new Date(Date.now());
                const value = [saldo, d]
                await pool.query(`UPDATE ${saldotb} SET (nominal, updated_at) = ($1, $2) WHERE "driver_id" = '${newData.driver_id}' RETURNING *;`, value);
            }
            return res;
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async saldo(id) {

        try {
            const saldo = await pool.query(`SELECT nominal FROM ${saldotb} WHERE "driver_id" = '${id}' ORDER BY updated_at DESC`);
            if (saldo.rowCount <= 0) {
                console.log("ID Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "ID " + kode + " tidak terdaftar"
                }
            } else {
                // console.log(saldo.rows);
                return saldo.rows
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }

    async history(id) {

        try {
            const history = await pool.query(`SELECT transaction_status, nominal, updated_at FROM ${topuptb} WHERE "driver_id" = '${id}' ORDER BY updated_at DESC`);
            if (history.rowCount <= 0) {
                console.log("ID Tidak Tersedia");
                return {
                    "status": "404",
                    "errors": "ID " + kode + " tidak terdaftar"
                }
            } else {
                // console.log(history.rows);
                return history.rows
            }
        } catch (ex) {
            console.log('Error : ' + ex);
        };
    }
}

module.exports = new PaymentActivityModel();