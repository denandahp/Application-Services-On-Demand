const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const { hash } = require('bcrypt');
const encryptPassword = require('../libs/secret').encryptPassword;
const comparePassword = require('../libs/secret').comparePassword;
const compareOTP = require('../libs/secret').compareOTP;
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const schema = '"public"';
const table = '"users"'
const dbTable = schema + '.' + table;

class UserModel {

  async login (username, password) {
    // password = encryptPassword(password, username);

    const res = await pool.query('SELECT id, username, password, role, email, phone from ' + dbTable + ' where username = $1', [username]);
    debug('login %o', res);

    if (res.rowCount <= 0) {
      throw new Error('User tidak ditemukan.');
    } else {
      // if (await comparePassword(password, res.rows[0].password)) {
      if (await password == res.rows[0].password) {
        res.rows[0].password = undefined; //undefined gunanya buat ngilangin di res.rows[0]
        return res.rows[0];
      } else {
        throw new Error('Password salah.');
      }
    }
  }

  async register (data) {
    var randomOTP = totp.now(); // => 432143
    let user = [data.namadepan, data.namabelakang, data.username, data.password, data.email, data.origin, data.phone, data.foto_stnk, data.foto_sim, data.photo, data.kota, data.role, randomOTP, 1, data.user_date, data.user_lastdate];
    let res =  await pool.query('INSERT INTO ' + dbTable + ' (namadepan, namabelakang, username, password, email, origin, phone, foto_stnk, foto_sim, photo, kota, role, otp, is_verified, user_date, user_lastdate )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING username,id,phone,email,otp;', user);
    let created = res.rows[0];
    //console.log(created);
    
    debug('register %o', res);
    return created;
  }

  async verifikasiotp(kodeOTP){
    const res = await pool.query('SELECT id, username, password, role, phone, otp FROM' + dbTable + 'where otp = $1',[kodeOTP]);
    //console.table(res.rows);
    //1 =  not verified , 2 = Pending, 3 = Verified
    if (res.rowCount <= 0) {
      throw new Error('OTP tidak ditemukan');
    } else {
      if (await totp.verify(kodeOTP)) {
        const updateVerif = await pool.query('UPDATE' + dbTable + 'SET is_verified = $1 WHERE otp = $2 ',[2,kodeOTP]);
        return res.rows[0];
      } else {
        throw new Error('OTP salah.');
      }
    }
    
  }

  async verifikasiUser (statusUserUpdate) {
    const res = await pool.query('SELECT id, username, role, is_verified FROM' + dbTable + 'where username = $1',[statusUserUpdate.username]);
    //1 =  not verified , 2 = Pending, 3 = Verified
    const updateVerif = await pool.query('UPDATE' + dbTable + 'SET is_verified = $1 WHERE username = $2 ',[statusUserUpdate.is_verified,statusUserUpdate.username]);
  }

  async edit (data) {
    let sets = [data.id, data.namadepan, data.namabelakang, data.username, data.password, data.email, data.origin, data.phone, data.photo, data.role];
    let res = await pool.query('UPDATE' + dbTable + 'SET (namadepan, namabelakang, username, password, email, origin, phone, photo, role) = ($2, $3, $4, $5, $6, $7, $8, $9, $10) WHERE id = $1 RETURNING id,namadepan,namabelakang, username, email, origin, phone,role', sets);
    
    debug('edit %o', res);
    if (res.rowCount <= 0) {
      throw 'Edit fail';
    } else {
      return res;
    }
  }

  async delete (data) {

    let id = data.id;
    let username = data.username;
    let column = (id === undefined) ? 'username' : 'id';

    const res = await pool.query('DELETE from ' + dbTable + ' where ' + column + ' = $1 RETURNING id, username, phone, role', [(id || username)]);

    debug('delete %o', res);

    return res;
  }

  async get (id) {

    let res;

    if (id === undefined) {
      res = await pool.query('SELECT id, username, role, phone, origin from ' + dbTable + ' ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT id, namadepan, namabelakang, username, password, email, origin, phone, photo, kota, role from ' + dbTable + ' where id = $1 ORDER BY id ASC', [id]);
    }

    debug('get %o', res);

    return res;
    
  }
}

module.exports = new UserModel();