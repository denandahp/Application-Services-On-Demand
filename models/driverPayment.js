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
        console.log(value);
        let res = await pool.query(`UPDATE ${topuptb} SET (transaction_status, transaction_id, signature_key, payment_type, updated_at) = ($1, $2, $3, $4, $5) WHERE "topup_id" = '${data.order_id}' RETURNING *;`, value);

        return res;

    }
}

module.exports = new PaymentActivityModel();