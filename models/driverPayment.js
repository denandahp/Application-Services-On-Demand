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

        let value = [data.transaction_status.toUpperCase(), data.transaction_id, data.signature_key, data.payment_type, data.transaction_time]
        let res = await pool.query(`UPDATE ${topuptb} SET (transaction_status, transaction_id, signature_key, payment_type, updated_at) = ($1, $2, $3, $4, $5) WHERE "topup_id" = '${data.order_id}' RETURNING *;`, value);

        if (res.rows[0].transaction_status == "SETTLEMENT") {
            let newData = res.rows[0]
            const driverID = await pool.query(`SELECT driver_id, nominal from ${saldotb} WHERE "driver_id" = '${newData.driver_id}'`);
            let saldo = driverID.rows[0].nominal + newData.nominal;
            var d = new Date(Date.now());
            let value = [saldo, d]
            var hasil = await pool.query(`UPDATE ${saldotb} SET (nominal, updated_at) = ($1, $2) WHERE "driver_id" = '${newData.driver_id}' RETURNING *;`, value);
        }
        console.log(hasil.rows[0]);
        return hasil;
    }
}

module.exports = new PaymentActivityModel();