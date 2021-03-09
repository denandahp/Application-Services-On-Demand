const debug = require('debug')('app:model:user');
const pool = require('../libs/db');
const {
  hash
} = require('bcrypt');
const encryptPassword = require('../libs/secret').encryptPassword;
const comparePassword = require('../libs/secret').comparePassword;
const compareOTP = require('../libs/secret').compareOTP;
const jsotp = require('jsotp');
const totp = jsotp.TOTP('BASE32ENCODEDSECRET');

const schema = '"public"';
const table = '"users"'
const dbTable = schema + '.' + table;
const scheduledb = 'public.schedule';

class UserModel {

  async login(username, password) {
    // password = encryptPassword(password, username);

    const res = await pool.query('SELECT id, username, password, role, is_verified from ' + dbTable + ' where username = $1', [username]);
    debug('login %o', res);

    if (res.rowCount <= 0) {
      throw new Error('User tidak ditemukan.');
    } else {
      // if (await comparePassword(password, res.rows[0].password)) {
      if (await password == res.rows[0].password) {
        res.rows[0].username = undefined; //undefined gunanya buat ngilangin di res.rows[0]
        res.rows[0].password = undefined;
        res.rows[0].role = undefined;
        return res.rows[0];
      } else {
        throw new Error('Password salah.');
      }
    }
  }

  async register(data, randomOTP) {
    try {
      //var randomOTP = totp.now(); // => generate OTP
      let otplimit = 120; // in Second
      var d = new Date(Date.now());
      d.setSeconds(d.getSeconds() + otplimit);
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var y = d.getFullYear();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();
      var FormattedDate = y + '-' + mm + '-' + dd + ' ' + hour + ':' + minute + ':' + second;
      console.log(FormattedDate);
      let user = [data.namadepan, data.namabelakang, data.username, data.password, data.email, data.phone, data.provinsi_penempatan, data.kota_penempatan, data.role, randomOTP, 1, d, d, FormattedDate];
      let res = await pool.query('INSERT INTO ' + dbTable + ' (namadepan, namabelakang, username, password, email, phone,provinsi_penempatan, kota_penempatan , role, otp, is_verified, user_date, user_lastdate, limit_otp )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING username,id,phone,email,user_date,otp,limit_otp;', user);
      let created = res.rows[0];
      //console.log(created);
      debug('register %o', res);
      return created;

    } catch (ex) {
      console.log('Enek seng salah iki ' + ex)
    };

  }

  async checkdatauser(data) {
    try {
      let status;
      const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 OR email = $2 OR phone = $3', [data.username, data.email, data.phone]);
      if (res.rowCount > 0) {
        if (res.rows[0].username == data.username) {
          return {
            "status": "400",
            "errors": "username " + data.username + " sudah terdaftar"
          }
        } else if (res.rows[0].email == data.email) {
          return {
            "status": "400",
            "errors": "email " + data.email + " sudah terdaftar"
          }
        } else if (res.rows[0].phone == data.phone) {
          return {
            "status": "400",
            "errors": "phone " + data.phone + " sudah terdaftar"
          }
        } else {
          return status = '200'
        }
      } else {
        return status = '200'
      }

    } catch (ex) {
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async searchingdata(data) {
    let res;
    console.log("cek sini");
    res = await pool.query('SELECT * from ' + dbTable + ' WHERE namadepan = $1 OR namabelakang = $1 OR username = $1 OR email = $1 OR phone = $1 OR phone_darurat = $1', [data]);
    debug('get %o', res);

    if (res.rowCount <= 0) {
      return 'User tidak ditemukan';
    } else {
      return res;
    }
  }

  async registerlanjut(data, datagambar) {
    try {
      var d = new Date(Date.now());
      //console.log(created);
      let user = [data.id, data.username, data.phone,
        data.phone_darurat, datagambar.photo, data.provinsi_identitas, data.kota_kab_identitas, data.kecamatan_identitas, data.kodepos_identitas, data.alamat_identitas,
        data.nama_kendaraan, data.pabrikan_kendaraan, data.kapasitas_mesin, data.plat_nomor, data.tahun_produksi, data.an_kepemilikan,
        datagambar.tampak_depan, datagambar.tampak_samping, datagambar.tampak_belakang, datagambar.foto_identitas, datagambar.foto_stnk, d
      ];
      let res = await pool.query('UPDATE' + dbTable +
        'SET (phone_darurat, photo, provinsi_identitas, kota_kab_identitas, kecamatan_identitas, kodepos_identitas, alamat_identitas, nama_kendaraan, pabrikan_kendaraan, kapasitas_mesin, plat_nomor, tahun_produksi, an_kepemilikan, tampak_depan, tampak_samping, tampak_belakang, foto_identitas, foto_stnk, user_lastdate) = ' +
        '($4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) WHERE id = $1 AND username = $2 AND phone = $3 RETURNING *',
        user);
      let created = res.rows[0];
      debug('edit %o', res);
      if (res.rowCount <= 0) {
        throw 'register fail';
      } else {
        return created;
      }

    } catch (ex) {
      console.log('Enek seng salah iki ' + ex)
    };

  }

  async verifikasiotp(kodeOTP, username) {
    var d = new Date(Date.now());
    const res = await pool.query('SELECT id, username, password, role, phone, otp, limit_otp FROM' + dbTable + 'where username = $1 AND otp = $2', [username, kodeOTP]);
    if (res.rowCount <= 0) {
      throw new Error('OTP tidak ditemukan');

    } else {
      if (await kodeOTP == res.rows[0].otp && d <= res.rows[0].limit_otp) {
        const updateVerif = await pool.query('UPDATE' + dbTable + 'SET is_verified = $1 WHERE otp = $2 ', [2, kodeOTP]);
        return updateVerif.rows[0];
      } else {
        throw new Error('OTP salah.');
        // console.log(FormattedDate);
      }
    }
  }

  async resendotp(data) {
    let otplimit = 120; // in Second
    var d = new Date(Date.now());
    d.setSeconds(d.getSeconds() + otplimit);
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var y = d.getFullYear();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
    var FormattedDate = y + '-' + mm + '-' + dd + ' ' + hour + ':' + minute + ':' + second;
    console.log(FormattedDate);
    var randomOTP = totp.now(); // => generate OTP

    const res = await pool.query('SELECT id, username, password, role, phone, user_lastdate, otp, limit_otp FROM' + dbTable + 'where username = $1 AND phone = $2', [data.username, data.phone]);
    if (res.rowCount <= 0) {
      throw new Error('User tidak ditemukan');
    } else {

      let sets = [data.username, data.phone, randomOTP, d, FormattedDate];
      let resdata = await pool.query('UPDATE' + dbTable + 'SET otp = $3, user_lastdate = $4 , limit_otp = $5 WHERE username =$1 AND phone = $2 RETURNING id,username,phone,otp,user_lastdate,limit_otp', sets);
      let created = resdata.rows[0];

      debug('edit %o', res);
      return created;
    }
  }

  async checkregistrasi(data, randomOTP) {
    try {
      let otplimit = 120; // in Second
      var d = new Date(Date.now());
      d.setSeconds(d.getSeconds() + otplimit);
      var dd = d.getDate();
      var mm = d.getMonth() + 1;
      var y = d.getFullYear();
      var hour = d.getHours();
      var minute = d.getMinutes();
      var second = d.getSeconds();
      var FormattedDate = y + '-' + mm + '-' + dd + ' ' + hour + ':' + minute + ':' + second;
      let user = [data.namadepan, data.namabelakang, data.username, data.password, data.email, data.phone, data.provinsi_penempatan, data.kota_penempatan, data.role, randomOTP, 1, d, FormattedDate];
      const res = await pool.query('SELECT * FROM' + dbTable + 'where username = $1 AND email = $2 AND phone = $3 AND is_verified = $4 ', [data.username, data.email, data.phone, 1]);
      if (res.rowCount > 0) {
        const updateregistrasi = await pool.query('UPDATE' + dbTable + 'SET (namadepan, namabelakang, username, password, email, phone, provinsi_penempatan, kota_penempatan, role, otp, is_verified, user_lastdate, limit_otp)' +
          '= ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) WHERE username = $3 RETURNING id, username, email, phone, is_verified, otp, user_lastdate, limit_otp', user);
        let created = updateregistrasi.rows[0];
        debug('register %o', updateregistrasi);
        return {
          "data": created,
          "status": '200'
        };
      } else {
        return {
          "status": '400'
        };;
      }

    } catch (ex) {
      console.log('Enek seng salah iki ' + ex)
    };
  }

  async verifikasiUser(statusUserUpdate) {
    const res = await pool.query('SELECT id, username, role, is_verified FROM' + dbTable + 'where username = $1', [statusUserUpdate.username]);
    //1 =  not verified , 2 = Pending, 3 = Verified
    const updateVerif = await pool.query('UPDATE' + dbTable + 'SET is_verified = $1 WHERE username = $2 ', [statusUserUpdate.is_verified, statusUserUpdate.username]);
  }

  async edit(data) {
    let sets = [data.id, data.namadepan, data.namabelakang, data.username, data.password, data.email, data.phone, data.photo, data.role];
    let res = await pool.query('UPDATE' + dbTable + 'SET (namadepan, namabelakang, username, password, email, phone, phone_darurat, photo, role) = ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE id = $1 RETURNING id,namadepan,namabelakang, username, email, phone,role', sets);

    debug('edit %o', res);
    if (res.rowCount <= 0) {
      throw 'Edit fail';
    } else {
      return res;
    }
  }

  async delete(data) {

    let id = data.id;
    let username = data.username;
    let column = (id === undefined) ? 'username' : 'id';

    const res = await pool.query('DELETE from ' + dbTable + ' where ' + column + ' = $1 RETURNING id, username, phone, role', [(id || username)]);

    debug('delete %o', res);

    return res;
  }

  async get(id) {

    let res;

    if (id === undefined) {
      res = await pool.query('SELECT * from ' + dbTable + ' ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT * from ' + dbTable + ' where id = $1 ORDER BY id ASC', [id]);
    }

    debug('get %o', res);

    return res;

  }

  async showAllUser(role, status) {

    let res;

    if (role == 'all') {
      res = await pool.query('SELECT * from ' + dbTable + ' ORDER BY id ASC')
    } else {
      if (status == 'all') {
        res = await pool.query('SELECT * from ' + dbTable + ' where role = $1 ORDER BY id ASC', [role]);
      } else {
        res = await pool.query('SELECT * from ' + dbTable + ' where role = $1 AND is_verified = $2 ORDER BY id ASC', [role, status]);
      }
    }

    debug('get %o', res);

    return res;
  }

  async userbyschedule(username) {

    let res;
    if (username == 'all') {
      res = await pool.query('SELECT * from ' + dbTable + ' INNER JOIN ' + scheduledb + ' ON ' + dbTable + '.username ' + '= ' + scheduledb + '.username ' + 'ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT * from ' + dbTable + ' INNER JOIN ' + scheduledb + ' ON ' + dbTable + '.username ' + '= ' + scheduledb + '.username ' + 'WHERE ' + dbTable + '.username = $1', [username]);
    }
    debug('get %o', res);

    return res;
  }

  async userstatus(id) {

    let res;

    if (id === undefined) {
      res = await pool.query('SELECT username,email, phone, role, is_verified  from ' + dbTable + ' ORDER BY id ASC')
    } else {
      res = await pool.query('SELECT username,email, phone, role, is_verified from ' + dbTable + ' where id = $1 ORDER BY id ASC', [id]);
    }

    debug('get %o', res);

    return res;

  }

}

module.exports = new UserModel();